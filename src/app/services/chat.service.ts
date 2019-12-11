import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { BaseService } from './BaseService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatMessage } from '../models/games/chat/chat.message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService<ChatMessage> {

  constructor(afs: AngularFirestore) {
    const path = 'game_chat_message';
    super(path, afs);
  }

  getByRoom(roomId: string) {
    return this.afs.collection(this.cloudTableName).ref.where('roomId', '==', roomId).orderBy('timestamp', 'asc').get().then((snap) => {
        return snap.docs.map((doc) => {
          const rest = doc.data();
          const ret = { id: doc.id, ...rest };
          return ret;
        });
        
      });
    }

}
