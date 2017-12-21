import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User }           from 'app/user/user';
import { Observable }     from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Msg } from 'app/msg/msg';

@Injectable()
export class MsgService {
    private getMsgUrl = 'messages/get';  // URL to web API
    private postMsgUrl = 'messages/post';  // URL to web API
    constructor (private http: Http) {}
    private socket;
    private url = window.location.origin;

    getMsgs (): Observable<Msg[]> {
        let observable = new Observable<Msg[]>(observer =>{
            this.socket = io(this.url);
            this.socket.on('getMessages', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    addMsg (msg: Msg): Observable<Msg> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.postMsgUrl, msg, options)
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
