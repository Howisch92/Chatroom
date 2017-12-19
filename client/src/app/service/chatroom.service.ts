import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Observable }     from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Chatroom } from 'app/chatroom/chatroom';

@Injectable()
export class ChatroomService {
    private getChatroomUrl = 'chatrooms/get';  // URL to web API
    private postChatroomUrl = 'chatrooms/post';  // URL to web API
    constructor (private http: Http) {}
    private socket;
    private url = window.location.origin;

    getChatRooms(): Observable<Chatroom[]> {
        let observable = new Observable(observer =>{
            console.log("Socket:",this.url);
            this.socket = io(this.url);
            this.socket.on('getChatrooms', (data) => {
               observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        console.log(observable);
        return observable;
    }

    addChatroom (cr: Chatroom): Observable<Chatroom> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.postChatroomUrl, cr, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
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
        //console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
