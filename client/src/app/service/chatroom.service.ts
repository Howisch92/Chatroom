import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Chatroom } from 'app/chatroom/chatroom';
import { Msg } from 'app/msg/msg';
import { User } from 'app/user/user';
@Injectable()
export class ChatroomService {
    private getChatroomUrl = 'chatrooms/get';  // URL to web API
    private postChatroomUrl = 'chatrooms/post';  // URL to web API
    private postMsgtoChatroomUrl = 'chatrooms/postMessage';
    private postUsertoChatroomUrl = 'chatrooms/postUser';
    private deleteUserFromUrl = 'chatrooms/deleteUser';
    constructor (private http: Http) {}
    private socket;
    private url = window.location.origin;


    getChatRooms(): Observable<Chatroom[]> {
        let observable = new Observable<Chatroom[]>(observer =>{
            this.socket = io(this.url);
            this.socket.on('getChatrooms', (data) => {
               observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    getMsgforChatroom(): Observable<Msg[]> {
        let observable = new Observable<Msg[]>(observer =>{
            this.socket = io(this.url);
            this.socket.on('getMsgForSpecificChat', (data) => {
               observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    
    getUsersforChatroom(): Observable<User[]> {
        let observable = new Observable<User[]>(observer =>{
            this.socket = io(this.url);
            this.socket.on('getUsersForSpecificChat', (data) => {
               observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    addUserToChat(cr: Chatroom): Observable<Chatroom> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.postUsertoChatroomUrl, cr, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addMsgToChat (cr: Chatroom): Observable<Chatroom> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.postMsgtoChatroomUrl, cr, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addChatroom (cr: Chatroom): Observable<Chatroom> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.postChatroomUrl, cr, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    removeUserFromChat(cr: Chatroom): Observable<Chatroom> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.deleteUserFromUrl, cr, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
