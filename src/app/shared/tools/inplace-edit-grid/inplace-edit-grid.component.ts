import {Component, OnInit, Input} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';

import { Observable, BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { CustomDataSource } from './custom.datasource';

@Component({
  selector: 'app-inplace-edit-grid',
  templateUrl: './inplace-edit-grid.component.html',
  styleUrls: ['./inplace-edit-grid.component.scss']
})
export abstract class InplaceEditGridComponent<T> implements OnInit {

  constructor() { }

  selection = new SelectionModel<any>(true, []);
  @Input() displayedColumns;
  protected _dataSource : CustomDataSource<T>;
  public get dataSource() : CustomDataSource<T> {
    return this._dataSource;
  }
  @Input() public set dataSource(v : CustomDataSource<T>) {
    this._dataSource = v;
  }
  
  update(el: T, val: any, propKey: string) {
    if (val == null) { return; }
    // copy and mutate
    const copy = this.dataSource.data().slice();
    //el.comment = comment; // MAKE UPDATE
    el[propKey] = val;
    this.dataSource.update(copy);

    //CustomDataSource
  }

  ngOnInit() {
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
    // this.isAllSelected() ?
    //     this.selection.clear() :
    //     this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
