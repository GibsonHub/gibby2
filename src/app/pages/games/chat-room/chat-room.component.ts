import { Component, OnInit } from '@angular/core';

import { ChatRoomService } from 'src/app/services/chatroom.service';
import { ChatRoom } from 'src/app/models/games/chat/chat.message.model';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  rooms: ChatRoom[];

  constructor(private _roomService: ChatRoomService) { }

  ngOnInit() {
    this._roomService.list().subscribe((data) => {
      this.rooms = data;
    });
  }

}
