import { Component, OnInit } from '@angular/core';
import { User } from 'app/user/user';
import { Msg } from 'app/msg/msg';
import './rxjs-operators';
import { MsgService } from 'app/service/msg.service';
import { UserService } from 'app/service/user.service';
import { ChatroomService} from 'app/service/chatroom.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MsgService,UserService]
})
export class AppComponent implements OnInit {

  constructor () {}

  ngOnInit() {
    
  }
}
