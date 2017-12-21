import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChatroomService } from 'app/service/chatroom.service'
import { MsgService } from 'app/service/msg.service';
import { UserService } from 'app/service/user.service';
import { Chatroom } from 'app/chatroom/chatroom';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { Msg } from 'app/msg/msg';
import { User } from 'app/user/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
  providers: [ChatroomService,MsgService]
})

export class ChatroomComponent implements OnInit {
  chatroom = new Chatroom("",[],[]);
  public listofChatrooms: Chatroom[] = [];
  public listofUsers: User[] =[];
  public listofMessages : Msg[]=[];
  title = "ey";
  currentChatroom = new Chatroom("",[],[]);
  currentChatroomMsgs = this.currentChatroom.messages;
  currentChatroomUsers = this.currentChatroom.users;
  newmsg = "";
  hidden = true;
  currentUser= new User("");
  private sib : any;
  private url = window.location.origin;

  constructor(private ChatroomService:ChatroomService,private http: Http, private MsgService:MsgService, private UserService:UserService, private router:Router, private activatedRoute:ActivatedRoute ) {}

  ngOnInit() {
    this.sib = this.activatedRoute.params.subscribe(params => {
      this.currentUser.userName = params['userName'];
    });
    
    this.http.get(this.url+'/chatrooms/get').map((data: any) => data.json())
    .subscribe(
            (data: any) => {
                this.listofChatrooms = data;
            });
    
    this.getAllChatrooms();
    this.getAllMsgsforChatRoom();
    this.getAllUsersforChatroom();
  }
  
  removeUserfromChat(){
    var index = this.currentChatroom.users.indexOf(this.currentUser,0);
    if(index > -1){
      this.currentChatroom.users.splice(index,1);
    }
    this.currentChatroom.users.find
    this.ChatroomService.removeUserFromChat(this.currentChatroom).subscribe(chat => {
      this.chatroom = chat;
    });
  }

  selectedRoom(selectedRoom) {
    this.hidden = false;
    if(this.currentChatroom.chatRoomName != selectedRoom.chatRoomName){
      this.currentChatroom = selectedRoom;
      this.currentChatroomMsgs = selectedRoom.messages;
      this.addNewUserToChatroom();
      this.getAllUsersforChatroom();
    }else{
      this.removeUserfromChat();
      this.currentChatroom = selectedRoom;
      this.currentChatroomMsgs = selectedRoom.messages;
      this.addNewUserToChatroom();
      this.getAllUsersforChatroom();
    }
  }

  registrereNewChat() {
    this.ChatroomService.addChatroom(this.chatroom).subscribe(
        ctr => {
          this.chatroom = ctr;
        }
      );
  }
  addNewMessage(){
    let msgToAdd = new Msg(this.currentUser,this.currentUser.userName,this.newmsg);
    this.currentChatroom.messages.push(msgToAdd);
    this.ChatroomService.addMsgToChat(this.currentChatroom).subscribe(chat =>{
      this.chatroom = chat;
    });
    this.MsgService.addMsg(msgToAdd).subscribe(ctr => {
        msgToAdd = ctr;
    });
  }
  addNewUserToChatroom(){
    this.currentChatroom.users.push(this.currentUser);
    this.ChatroomService.addUserToChat(this.currentChatroom).subscribe(chat =>{
      this.chatroom = chat;
    });
  }

  getAllChatrooms() {
    this.ChatroomService.getChatRooms()
      .subscribe(
        chatrooms => {
          this.listofChatrooms = chatrooms;
        },
        error =>  this.title = <any>error
      );
  }

  getAllMsgsforChatRoom(){
    this.ChatroomService.getMsgforChatroom()
    .subscribe(
      messages => {
        this.currentChatroomMsgs = messages;
        this.currentChatroom.messages = messages;
      },
      error =>  this.title = <any>error
    );
  }
  getAllUsersforChatroom (){
    this.ChatroomService.getUsersforChatroom()
    .subscribe(
      users => {
        this.currentChatroomUsers = users;
        this.currentChatroom.users = users;
      },
      error =>  this.title = <any>error
    );
  }
}
