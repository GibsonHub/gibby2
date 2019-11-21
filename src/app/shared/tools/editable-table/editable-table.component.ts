import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MouseMeta } from 'src/app/models/mouse-meta.model';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent implements OnInit {

  @Input() displayedColumns: string[];
  selection = new SelectionModel<any>(true, []);
  @Input() dataSource: any;

  @Output() inlineEditRecord: EventEmitter<any>;


  tableMouseDown: MouseMeta;
  tableMouseUp: MouseMeta;
  FIRST_EDITABLE_ROW: number = 0;
  LAST_EDITABLE_ROW: number;
  FIRST_EDITABLE_COL: number = 1;                       // first column pos is not editable --> so start from index 1
  LAST_EDITABLE_COL: number; // = 3
  newCellValue: string = '';
  selectedCellsState: boolean[][];
  numRows: number = 0;
  private dataSubject = new BehaviorSubject<Element[]>([]);
  currentColumn: object = {
    name: '',
    index: 0
  };

  constructor(private snackBar: MatSnackBar) { 
    //['select', 'UserID', 'Email', 'DisplayName', 'FirstName', 'LastName', 'MiddleName', 'BirthDate', 'SpecialAccess']
    this.dataSubject.next([]);
    this.inlineEditRecord = new EventEmitter<any>();
  }

  ngOnInit() {
    //console.log('ngOnInit(): ', this.displayedColumns);
    this.LAST_EDITABLE_COL = this.displayedColumns.length - 1;
    //this.falseAllSelectedCellsState();
  }

  
  isAllSelected() {
    if (!this.dataSource || !this.dataSource.data) { return false; }
    const numSelected = this.selection.selected.length;
    //console.log(this.dataSource);
    //return false;
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
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  connect(): Observable<Element[]> {
    return this.dataSubject;
  }

  disconnect() {}
  data() {
    return this.dataSubject.value;
  }

  update(data, evt) {
    //console.log('update()', data, evt);
    console.log(data);
    console.log(evt);
    //this.updateSelectedCellsValues(evt);
    
    this.inlineEditRecord.emit({ updateDataParam: data, updateEventParam: evt, currentColumnMeta: this.currentColumn });
    this.dataSubject.next(data);
  }
  /**
   * Update table's dataSource
   * @param text
   */
  updateSelectedCellsValues(text: string) {

    console.log('A');
    if (text == null) { return; }

    console.log('B');
    if(this.tableMouseDown && this.tableMouseUp) {
      console.log('C');
      if(this.tableMouseDown.cellsType === this.tableMouseUp.cellsType) {
        console.log('HERE');
        if (!this.dataSource || !this.dataSource.data) { return false; }
        console.log('THERE');
        const dataCopy: any[] = this.dataSource.data.slice(); // copy and mutate
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

        this.currentColumn['index'] = startCol;
        this.currentColumn['name'] = this.displayedColumns[startCol];
        this.currentColumn['row'] = startRow;

        //--Edit cells from the same column
        if(startCol === endCol) {
          console.log('--Edit cells from the same column');
          for(let i = startRow; i <= endRow; i++) {
            console.log('To-Edit', dataCopy[i][this.displayedColumns[startCol]], text);
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


  falseAllSelectedCellsState() {
    if (!this.dataSource || !this.dataSource.data) { return false; }
    this.selectedCellsState = [];
    let tmp;
    for (let i = 0; i < this.dataSource.data.length; i++) {
      // tmp = [];
      // for (let j = 0; j < this.displayedColumns.length; j++) {
      //   tmp.push(false);
      // }
      // this.selectedCellsState.push(tmp);
      this.selectedCellsState.push([false, false, false]);
    }
    //console.log('FALSEY', this.dataSource.data);
  }

  getColumnIndex(cellsType) {
    const r = this.displayedColumns.indexOf(cellsType);
    console.log('rindex:', r, ' for '+cellsType);
    return r;
  }
  /**
   * @param rowId
   * @param colId
   * @param cellsType
   */
  onMouseDown(rowId: number, cellsType: string) {
    console.log('cellsType: ' + cellsType);
    this.tableMouseDown = {rowId: rowId, colId: this.getColumnIndex(cellsType), cellsType: cellsType};
  }

  /**
   * @param rowId
   * @param colId
   * @param cellsType
   */
  onMouseUp(rowId: number, cellsType: string) {

    this.tableMouseUp = {rowId: rowId, colId: this.getColumnIndex(cellsType), cellsType: cellsType};
    
    //console.log(this.tableMouseDown, this.tableMouseUp);

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
    // for (let i = this.FIRST_EDITABLE_ROW; i <= this.LAST_EDITABLE_ROW; i++) {
    //   for (let j = this.FIRST_EDITABLE_COL; j <= this.LAST_EDITABLE_COL; j++) {
    //     this.selectedCellsState[i][j] = false;
    //   }
    // }
    this.falseAllSelectedCellsState();
    
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
    //console.log('start/end', startRow, endRow, startCol, endCol);
    //console.log(this.selectedCellsState);
    //return false;
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
