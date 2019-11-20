import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProfileModel } from 'src/app/models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input()
  currentProfile: ProfileModel;

  constructor(private snackBar: MatSnackBar, private _profileSerice: ProfileService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    //this._profileSerice.createTestRecord('123', 'jeffy-test-1');
    //this._profileSerice.updateOrCreate(this.afAuth);
    this.afAuth.user.subscribe((u) => {
      this._profileSerice.updateOrCreate(u).then((result) => {
        this.currentProfile = result;
      }).catch((err) => {
        console.log('ERROR', err);
      });
    });
  }

  imageCallback(img) {
    console.log('Callback!!!!');
    console.log(img);
    this.currentProfile.PhotoUrl = img;
  }

  saveProfile(evt) {
    //console.log(evt);
    //console.log(this.currentProfile);
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

}
