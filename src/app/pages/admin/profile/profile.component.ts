import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input, HostListener } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

import { ProfileModel } from 'src/app/models/profile.model';
import { MouseMeta } from 'src/app/models/mouse-meta.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input()
  currentProfile: ProfileModel;
  allProfiles: Array<ProfileModel>;
  okToCreateProfile: boolean = true;

  displayedColumns: string[] = ['select', 'UserID', 'Email', 'DisplayName', 'FirstName', 'LastName', 'MiddleName', 'BirthDate', 'SpecialAccess'];
  selection = new SelectionModel<ProfileModel>(true, []);
  dataSource: any;


  tableMouseDown: MouseMeta;
  tableMouseUp: MouseMeta;
  FIRST_EDITABLE_ROW: number = 0;
  LAST_EDITABLE_ROW: number;
  FIRST_EDITABLE_COL: number = 1;                       // first column pos is not editable --> so start from index 1
  LAST_EDITABLE_COL: number = this.displayedColumns.length - 1; // = 3
  newCellValue: string = '';
  selectedCellsState: boolean[][];

  constructor(private snackBar: MatSnackBar, private _profileSerice: ProfileService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    
    this.afAuth.user.subscribe((u) => {
      if (this.okToCreateProfile) {
        this.okToCreateProfile = false;
        
        this._profileSerice.updateOrCreate(u).then((result) => {
          this.currentProfile = result;
          if (this.currentProfile.SpecialAccess) {
            this.fetchSpecialAccess();
          }
        }).catch((err) => {
          console.log('ERROR updateOrCreate(u)', err);
        });
      }
      
    });
  }

  imageCallback(img) {
    this.currentProfile.PhotoUrl = img;
  }

  saveProfile(evt) {
    //this.currentProfile.SpecialAccess = (this.currentProfile.SpecialAccess.valueOf.toString() == 'true');
    this._profileSerice.update(this.currentProfile).catch((err) => {
      console.log('Error:', err);
    }).then((d) => {
      //console.log('Saved!');
      this.snackBar.open('Saved!', 'OK', {
        duration: 5000
      });
    });
    return false;
  }

  fetchSpecialAccess() {
    this._profileSerice.list().subscribe((records) => {
      this.dataSource = new MatTableDataSource<ProfileModel>(records);
      this.allProfiles = records;
      this.LAST_EDITABLE_ROW = records.length - 1;
      this.selectedCellsState = [];
      for (let i = 0; i < records.length; i++) {
        this.selectedCellsState.push([false, false, false]);
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProfileModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /**
   * Update table's dataSource
   * @param text
   */
  updateSelectedCellsValues(text: string) {

    if (text == null) { return; }

    if(this.tableMouseDown && this.tableMouseUp) {
      if(this.tableMouseDown.cellsType === this.tableMouseUp.cellsType) {

        const dataCopy: ProfileModel[] = this.dataSource.slice(); // copy and mutate
        let startCol: number;
        let endCol:   number;
        let startRow: number;
        let endRow:   number;

        if(this.tableMouseDown.colId <= this.tableMouseUp.colId) {
          startCol = this.tableMouseDown.colId;
          endCol   = this.tableMouseUp.colId;
        } else {
          endCol   = this.tableMouseDown.colId;
          startCol = this.tableMouseUp.colId;
        }

        if(this.tableMouseDown.rowId <= this.tableMouseUp.rowId) {
          startRow = this.tableMouseDown.rowId;
          endRow   = this.tableMouseUp.rowId;
        } else {
          endRow   = this.tableMouseDown.rowId;
          startRow = this.tableMouseUp.rowId;
        }

        //--Edit cells from the same column
        if(startCol === endCol) {
          console.log('--Edit cells from the same column');
          for(let i = startRow; i <= endRow; i++) {
            dataCopy[i][this.displayedColumns[startCol]] = text;
          }
        } else {
          //--Edit cells starting and ending not on the same column
          console.log('--Edit cells starting and ending not on the same column');

          for(let i = startRow; i <= endRow; i++) {
            for(let j = startCol; j <= endCol; j++) {
              dataCopy[i][this.displayedColumns[j]] = text;
            }
          }
        }
        console.log('--update: ' + startRow + ', '+ startCol + ' to ' + endRow + ', '+ endCol);
        this.dataSource = dataCopy;

      } else {
        this.openSnackBar('The selected cells don\'t have the same type.', 'OK');
      }
    }
  }

  /**
   * @param rowId
   * @param colId
   * @param cellsType
   */
  onMouseDown(rowId: number, colId: number, cellsType: string) {

    this.tableMouseDown = {rowId: rowId, colId: colId, cellsType: cellsType};
  }

  /**
   * @param rowId
   * @param colId
   * @param cellsType
   */
  onMouseUp(rowId: number, colId: number, cellsType: string) {

    this.tableMouseUp = {rowId: rowId, colId: colId, cellsType: cellsType};
    
    console.log(this.tableMouseDown, this.tableMouseUp);

    if(this.tableMouseDown) {
      this.newCellValue = '';
      this.updateSelectedCellsState(this.tableMouseDown.colId, this.tableMouseUp.colId, this.tableMouseDown.rowId, this.tableMouseUp.rowId);
    }
  }

  /**
   * Update selectedCols && selectedRows arrays
   * @param mouseDownColId
   * @param mouseUpColId
   * @param mouseDownRowId
   * @param mouseUpRowId
   */
  private updateSelectedCellsState(mouseDownColId: number, mouseUpColId: number, mouseDownRowId: number, mouseUpRowId: number) {

    // init selected cells
    for (let i = this.FIRST_EDITABLE_ROW; i <= this.LAST_EDITABLE_ROW; i++) {
      for (let j = this.FIRST_EDITABLE_COL; j <= this.LAST_EDITABLE_COL; j++) {
        this.selectedCellsState[i][j] = false;
      }
    }
    // update selected cells
    let startCol: number;
    let endCol:   number;
    let startRow: number;
    let endRow:   number;
    if (mouseDownColId <= mouseUpColId) {
      startCol = mouseDownColId;
      endCol   = mouseUpColId;
    } else {
      endCol   = mouseDownColId;
      startCol = mouseUpColId;
    }

    if (mouseDownRowId <= mouseUpRowId) {
      startRow = mouseDownRowId;
      endRow   = mouseUpRowId;
    } else {
      endRow   = mouseDownRowId;
      startRow = mouseUpRowId;
    }
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        this.selectedCellsState[i][j] = true;
      }
    }
    console.log('updateSelectedCellsState:', this.selectedCellsState);
  }

  /**
   * After the user enters a new value, all selected cells must be updated
   * document:keyup
   * @param event
   */
  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {

    // If no cell is selected then ignore keyUp event
    if(this.tableMouseDown && this.tableMouseUp) {

      let specialKeys: string[] = ['Enter', 'PrintScreen', 'Escape', 'cControl', 'NumLock', 'PageUp', 'PageDown', 'End',
        'Home', 'Delete', 'Insert', 'ContextMenu', 'Control', 'ControlAltGraph', 'Alt', 'Meta', 'Shift', 'CapsLock',
        'TabTab', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Pause', 'ScrollLock', 'Dead', '',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];

      if(event.key === 'Backspace') { // 'delete' key is pressed
        const end: number = this.newCellValue.length - 1;
        this.newCellValue = this.newCellValue.slice(0, end);

      } else if(this.indexOfInArray(event.key, specialKeys) === -1) {
        this.newCellValue += event.key;
      }
      this.updateSelectedCellsValues(this.newCellValue);
    }
  }

  indexOfInArray(item: string, array: string[]): number {
    let index: number = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === item) { index = i; }
    }
    return index;
  }

  /**
   * @param message
   * @param action
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 4000 });
  }

}
