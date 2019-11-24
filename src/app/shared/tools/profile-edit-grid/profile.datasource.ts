import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';

import { CustomDataSource } from '../inplace-edit-grid/custom.datasource';
import { ProfileModel } from 'src/app/models/profile.model';

export class ProfileDataSource extends CustomDataSource<ProfileModel> {

    // private dataSubject = new BehaviorSubject<T[]>([]);
  
    // data() {
    //   return this.dataSubject.value;
    // }
  
    // update(data) {
    //   this.dataSubject.next(data);
    // }
  
    // constructor(data: ProfileModel[]) {
    //   super(data);
    //   this.dataSubject.next(data);
    // }
  
    // // /** Connect function called by the table to retrieve one stream containing the data to render. */
    // connect(): Observable<ProfileModel[]> {
    //   return this.dataSubject;
    // }
  
    // disconnect() {}
  }