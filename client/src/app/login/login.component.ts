import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'app/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Chat Room';
  user = new User("");
  userNameList = [];
  constructor(private UserService: UserService, private router:Router) { }

  registerUser (){
    this.UserService.addUser(this.user).subscribe(user => {
      this.user = user;
    });
    this.router.navigate(['/chatRoom']);
  }

  getUsers(){
    this.UserService.getUsers().subscribe(user => {
        this.userNameList = user;
    });
  }

  ngOnInit() {
  }

}
