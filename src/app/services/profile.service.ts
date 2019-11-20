import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { ProfileModel } from '../models/profile.model';
import { BaseService } from './BaseService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService<ProfileModel> {

  protected byUserIdCollection: AngularFirestoreCollection<ProfileModel>;

  // constructor(public afs: AngularFirestore, private router: Router) { 
    
  // }

  constructor(afs: AngularFirestore) {
    const path = 'profiles';
    
    super(path, afs);
    this.byUserIdCollection = afs.collection(path);
  }

  getByUserId(identifier: string): Observable<ProfileModel> {
    //this.logger.logVerbose(`[BaseService] get: ${identifier}`);

    return this.collection
        .doc<ProfileModel>('UserID' + identifier)
        .snapshotChanges()
        .pipe(
            map(doc => {
                if (doc.payload.exists) {
            /* workaround until spread works with generic types */
                    const data = doc.payload.data() as any;
                    const id = doc.payload.id;
                    return { id, ...data };
                }
            })
        );
}

  

  updateOrCreate(authUser) {
    console.log('looking for UID: ' + authUser.uid);
    let res = this.getByUserId(authUser.uid);
    res.subscribe((t) => {
      console.log('done');
      console.log(t);
    });
    console.log(res);
    if (!res) {
      const usr:ProfileModel = {
              UserID: authUser.uid,
              Email: authUser.email
            };
      this.add(usr);
    }
    //console.log(authUser);
    // const ref = this.afs.collection<ProfileModel>('profiles').ref;
    // ref.where('UserID', '==', authUser.uid).onSnapshot((snap) => {
    //   console.log('SIZE: ' + snap.size);
    //   if (!snap.size) {
    //     // not found
    //     const usr:ProfileModel = {
    //       UserID: authUser.uid,
    //       Email: authUser.email
    //     };
    //     ref.add(usr);
    //   } else {
        
    //     console.log(snap);
    //     //console.log(snap.UserID);
    //   }
    // });
  }


}
