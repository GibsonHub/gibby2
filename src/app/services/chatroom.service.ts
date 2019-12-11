import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { BaseService } from './BaseService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatRoom } from '../models/games/chat/chat.message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService extends BaseService<ChatRoom> {

  constructor(afs: AngularFirestore) {
    const path = 'game_chat_room';
    super(path, afs);
  }


}
