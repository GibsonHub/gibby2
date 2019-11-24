import { Component, OnInit, Input } from '@angular/core';

import { ProfileModel } from 'src/app/models/profile.model';
import { InplaceEditGridComponent } from '../inplace-edit-grid/inplace-edit-grid.component';
import { ProfileDataSource } from './profile.datasource';
import { CustomDataSource } from '../inplace-edit-grid/custom.datasource';

@Component({
  selector: 'app-profile-edit-grid',
  templateUrl: './profile-edit-grid.component.html',
  styleUrls: ['./profile-edit-grid.component.scss']
})
export class ProfileEditGridComponent extends InplaceEditGridComponent<ProfileModel> implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
