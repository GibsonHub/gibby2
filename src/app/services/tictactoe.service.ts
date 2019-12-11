import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { BaseService } from './BaseService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TicTacToeGameState } from '../models/games/TicTacToe/tictactoe.gamestate.model';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService extends BaseService<TicTacToeGameState> {

  constructor(afs: AngularFirestore) {
    const path = 'game_ttt';
    super(path, afs);
  }

  getByGameId(identifier: string) {
    return this.getBy('GameID', '==', identifier);
  }

  

//   updateOrCreate(authUser) {
//     if (!authUser) { return Promise.reject(); }
//     //console.log('looking for UID: ' + authUser.uid);
    
//     const result = this.getByUserId(authUser.uid).then((r) => {
//       if (r && (r.length > 0)) {
//         console.log('fetched profile: ', r[0]);
//         return r[0];
//       } else {
//         const pf: ProfileModel = {
//           // UserID: authUser.uid,
//           Email: authUser.email,
//           PhotoUrl: 'https://p7.hiclipart.com/preview/631/2/408/human-head-silhouette-face-clip-art-face-outline.jpg'
//         };
//         if (authUser && authUser.uid) {
//           pf.UserID = authUser.uid;
//         }

//         this.collection.add(pf);
//         console.log('created profile: ', pf);
//         return pf;
//       }
//     });
//     return result;
//   }


}
