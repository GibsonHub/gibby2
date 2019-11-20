import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(public afAuth: AngularFireAuth, public profileService: ProfileService) { }

  ensureProfileUponLogin(user) {
    this.profileService.updateOrCreate(user);
  }
}
