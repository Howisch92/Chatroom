import { User } from "app/user/user";

export class Msg {
    constructor(
      public user:User,
      public userName:String,
      public msgBody:String
    ) {}
  }