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

  constructor(afs: AngularFirestore) {
    const path = 'profiles';
    super(path, afs);
  }

  getByUserId(identifier: string) {
    return this.getBy('UserID', '==', identifier);
  }

  

  updateOrCreate(authUser) {
    if (!authUser) { return Promise.reject(); }
    //console.log('looking for UID: ' + authUser.uid);
    
    const result = this.getByUserId(authUser.uid).then((r) => {
      if (r && (r.length > 0)) {
        console.log('fetched profile: ', r[0]);
        return r[0];
      } else {
        const pf: ProfileModel = {
          // UserID: authUser.uid,
          Email: authUser.email,
          PhotoUrl: 'https://p7.hiclipart.com/preview/631/2/408/human-head-silhouette-face-clip-art-face-outline.jpg'
        };
        if (authUser && authUser.uid) {
          pf.UserID = authUser.uid;
        }

        this.collection.add(pf);
        console.log('created profile: ', pf);
        return pf;
      }
    });
    return result;
  }


}
