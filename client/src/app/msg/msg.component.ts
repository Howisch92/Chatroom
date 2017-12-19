import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MsgService } from 'app/service/msg.service'
import { Msg } from 'app/msg/msg';
import { User } from 'app/user/user';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {
  title = "Message Component Title";
  u2 = new User("Navn13");
  message = new Msg(this.u2,"Im a New message");
  constructor(private MsgService: MsgService) { }

  submitMsg() {
    this.MsgService.addMsg(this.message)
      .subscribe(
        msg => {
          // console.log("Messages:", messages);
          this.message = msg;
          // this.getBlogs();
        },
        error =>  this.title = <any>error
      );
  }

  ngOnInit() {
  }

}
