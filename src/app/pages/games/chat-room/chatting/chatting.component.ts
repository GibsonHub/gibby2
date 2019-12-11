import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Observable } from 'rxjs';

import { ChatRoomService } from 'src/app/services/chatroom.service';
import { ChatService } from 'src/app/services/chat.service';
import { ChatRoom, ChatMessage } from 'src/app/models/games/chat/chat.message.model';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.scss']
})
export class ChattingComponent implements OnInit {

  roomId: string;

  form: FormGroup;
  type: 'cancel' | 'send';
  loading = false;

  currentRoom: ChatRoom;
  messages: ChatMessage[];

  observableMessages: Observable<ChatMessage>[];

  constructor(private _roomService: ChatRoomService, private _chatService: ChatService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.fb.group({
      body: ['', []]
    });

    this.roomId = this.route.snapshot.paramMap.get('id');
    this.updateMessageList();
    const poller = interval(1000);
    poller.subscribe(n => {
      this.updateMessageList();
    });

    // this._chatService.collection.valueChanges().subscribe((data) => {
    //   console.log('changed', data);
    //   this.messages = data;
    // });

    // this._chatService.list().subscribe((list) => {
    //   console.log('changed', list);
    // });
  }

  updateMessageList() {
    this._roomService.get(this.roomId).subscribe((room) => {
      this.currentRoom = room;

      this._chatService.getByRoom(this.currentRoom.id).then((messages) => {
        this.messages = messages as ChatMessage[];
      });
    });
  }

  onSubmit() {
    const m: ChatMessage = {
      priority: 9,
      body: this.form.value['body'],
      roomId: this.currentRoom.id,
      timestamp: new Timestamp<number>(Date.now(), 1).value
    };

    console.log('sending', m);
    this._chatService.add(m).then((r) => {
      this.updateMessageList();
      this.form.reset();
    });

  }

}
