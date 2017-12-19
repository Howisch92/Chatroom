import { User } from 'app/user/user';
import { Msg } from 'app/msg/msg';

export class Chatroom {
  chatRoomName: String;
  messages: Msg[];
  users: User[];
    constructor(chatRoomName: String,messages: Msg[], users: User[]) {
      this.chatRoomName = chatRoomName;
      this.messages = messages;
      this.users = users;
      }
      addMsgToList(msg){
        this.messages.push(msg);
      }
  }