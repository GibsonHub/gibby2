import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';

import { ChatRoomService } from 'src/app/services/chatroom.service';
import { Router } from '@angular/router';
import { ChatRoom } from 'src/app/models/games/chat/chat.message.model';

@Component({
  selector: 'app-createchat',
  templateUrl: './createchat.component.html',
  styleUrls: ['./createchat.component.scss']
})
export class CreatechatComponent implements OnInit {

  form: FormGroup;
  type: 'cancel' | 'create';
  loading = false;

  constructor(private _roomService: ChatRoomService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', []]
    });
  }

  onSubmit() {
    const newRoom: ChatRoom = {
      name: this.form.value['name'],
      status: 'active'
    };
    this._roomService.add(newRoom).then((room) => {
      this.router.navigate(['games', 'chat-room', 'chatting', room.id]);
    });
  }

}
