import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  

  constructor(private _profileSerice: ProfileService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    //this._profileSerice.createTestRecord('123', 'jeffy-test-1');
    //this._profileSerice.updateOrCreate(this.afAuth);
    this.afAuth.user.subscribe((u) => {
      this._profileSerice.updateOrCreate(u);
    });
  }

}
