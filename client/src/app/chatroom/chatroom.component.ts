import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChatroomService } from 'app/service/chatroom.service'
import { Chatroom } from 'app/chatroom/chatroom';
import { error } from 'util';
import { Msg } from 'app/msg/msg';
import { User } from 'app/user/user';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
  providers: [ChatroomService]
})

export class ChatroomComponent implements OnInit {
  chatroom = new Chatroom("",[],[]);
  public listofChatrooms: Chatroom[] = [];
  title = "ey";
  currentChatroom = new Chatroom("",[],[]);
  currentChatroomMsgs = this.currentChatroom.messages;
  newmsg = "";

  constructor(private ChatroomService:ChatroomService) {
    // let u0 = new User("Navn1");
    // let u1 = new User("Navn2");
    // let u2 = new User("Navn13");
    // let hg = new Msg(u2,"SDDDDDDDDDDDDDDDDDDDDDDD");
    // let mg = new Msg(u2,"møj");
    // let sg = new Msg(u1,"kkkk");
    // let arrofUser = [];
    // let arrofMsg = [];
    // let arrofMsg2 = [];
    // arrofMsg[0] = mg;
    // arrofMsg[1] = sg;
    // arrofMsg[2] = hg;
    // arrofMsg2[0] = mg;
    // arrofMsg2[1] = sg;
    // arrofUser[0] = u0;
    // let ex = new Chatroom("Channel1",arrofMsg,arrofUser);
    // let ex2 = new Chatroom("ChannelTWO",arrofMsg2,arrofUser);
    // let arofchatroom = []
    // arofchatroom[0] = ex;
    // arofchatroom[1] = ex2;
    // this.currentChatroom = ex;
    // this.listofChatrooms = arofchatroom;
  }

  ngOnInit() {
    console.log(this.listofChatrooms);
    this.getAllChatrooms();
    console.log(this.listofChatrooms);
  }

  myFunction(selectedRoom) {
    this.currentChatroom = selectedRoom;
    this.currentChatroomMsgs = selectedRoom.messages;
  }

  registrereNewChat() {
    this.ChatroomService.addChatroom(this.chatroom).subscribe(
        ctr => {
          this.chatroom = ctr;
        }
      );
  }
  addNewMessage(){
    console.log(this.newmsg);
    
  }

  getAllChatrooms() {
    console.log('Subscribe to service');
    this.ChatroomService.getChatRooms()
      .subscribe(
        messages => {
          this.listofChatrooms = messages;
        },
        error =>  this.title = <any>error
      );
      console.log(this.listofChatrooms);
  }




}
