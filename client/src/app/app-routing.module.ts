import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from 'app/user/user.component';
import { ChatroomComponent } from 'app/chatroom/chatroom.component';
import { LoginComponent } from 'app/login/login.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'chatRoom', component: ChatroomComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class MEAN2RoutingModule { }
