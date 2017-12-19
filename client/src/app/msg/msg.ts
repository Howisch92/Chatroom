import { User } from "app/user/user";

export class Msg {
    constructor(
      public user:User,
      public msgBody:String
    ) {}
  }