import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

import { ProfileModel } from 'src/app/models/profile.model';

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
}
