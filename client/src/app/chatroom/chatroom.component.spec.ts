import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomComponent } from './chatroom.component';
import { Chatroom } from 'app/chatroom/chatroom';
import { User } from 'app/user/user';
import { Msg } from 'app/msg/msg';

describe('ChatroomComponent', () => {
  let component: ChatroomComponent;
  let fixture: ComponentFixture<ChatroomComponent>;
  let users : User[] = [];
  let messages : Msg[] = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a chatroom', () => {
    expect(new Chatroom('TestChatRoom',messages,users)).toBeDefined();
  });
  
});