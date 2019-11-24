import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input, HostListener } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

import { ProfileModel } from 'src/app/models/profile.model';
import { MouseMeta } from 'src/app/models/mouse-meta.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileDataSource } from 'src/app/shared/tools/profile-edit-grid/profile.datasource';
import { CustomDataSource } from 'src/app/shared/tools/inplace-edit-grid/custom.datasource';

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

  // displayedColumns: string[] = ['select', 'UserID', 'Email', 'DisplayName', 'FirstName', 'LastName', 'MiddleName', 'BirthDate', 'SpecialAccess'];
  // selection = new SelectionModel<ProfileModel>(true, []);
  dataSource: any;


  // tableMouseDown: MouseMeta;
  // tableMouseUp: MouseMeta;
  // FIRST_EDITABLE_ROW: number = 0;
  // LAST_EDITABLE_ROW: number;
  // FIRST_EDITABLE_COL: number = 1;                       // first column pos is not editable --> so start from index 1
  // LAST_EDITABLE_COL: number = this.displayedColumns.length - 1; // = 3
  // newCellValue: string = '';
  // selectedCellsState: boolean[][];
  // private dataSubject = new BehaviorSubject<Element[]>([]);

  constructor(private snackBar: MatSnackBar, private _profileSerice: ProfileService, public afAuth: AngularFireAuth) {
    //this.dataSubject.next([]);
  }

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

  catchInlineEditProfile(obj) {
    if (!obj['updateEventParam'] || (obj['updateEventParam'] == '') || !obj['currentColumnMeta'] ) { return false; }
    console.log('CATCH:', obj);
    const rowIndex = obj['currentColumnMeta']['row'];
    const colName = obj['currentColumnMeta']['name'];
    console.log(rowIndex, colName);
    if ((rowIndex < 0) || (colName == '') || (colName == 'select')) { return false; }
    this.allProfiles[rowIndex][colName] = obj['updateEventParam'];
    //this.allProfiles[obj['currentColumnMeta']['row']]
  }

  imageCallback(img) {
    this.currentProfile.PhotoUrl = img;
  }

  createDataSource() {
    //return this.dataSource;
    //return new ProfileDataSource(this.allProfiles);
    const ds = new ProfileDataSource(this.allProfiles);
    //console.log(ds);
    return ds;
    
  }
  fetchSpecialAccess() {
    this._profileSerice.list().subscribe((records) => {
      this.dataSource = new MatTableDataSource<ProfileModel>(records);
      this.allProfiles = records;
    });
  }

}
