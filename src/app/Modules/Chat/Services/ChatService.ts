import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { userInfoResponse } from "../../Shared/Models/userInfoResponse";
import { getChatHistory } from "../Models/getChatHistory";
import { chatHistoryResponse } from "../Models/chatHistoryResponse";


@Injectable({
    providedIn: 'root'
  })
  export class ChatService{
    isUserlogged: BehaviorSubject<string>;
    userToken: BehaviorSubject<string>;
    private hubConnection: HubConnection;
    private messageSubject = new Subject<{ user: string, message: string }>();

      _url:string='https://localhost:7209';
      
      constructor(private _http:HttpClient){
        this.isUserlogged = new BehaviorSubject<string>(String(localStorage.getItem('IsLoggedIn')));
        this.userToken = new BehaviorSubject<string>(String(localStorage.getItem('token')));
        const token = this.userToken;
        //console.log(token);
        //console.log(String(localStorage.getItem('token')));
        this.hubConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7209/chatHub?token='+String(localStorage.getItem('token')))
        .build();
  
        this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
        this.messageSubject.next({ user, message });
      });
  
      this.hubConnection.start();
      }
      sendMessage(user: string, message: string, recipient: string) {
        this.hubConnection.send('SendMessage', user, message, recipient);
      }
    
      getMessageSubject() {
        return this.messageSubject.asObservable();
      }

      friendsList():Observable<userInfoResponse[]>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${localStorage.getItem("token")}`
          })
        }
        
        return this._http.get<userInfoResponse[]>(`${this._url}/api/Chat/GetFriendsList`,httpOptions);
      }
      getChatHistory(obj:getChatHistory):Observable<chatHistoryResponse[]>
      {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization':  `Bearer ${localStorage.getItem("token")}`
            })
          }
          return this._http.post<chatHistoryResponse[]>(`${this._url}/api/Chat/GetChatHistory`,JSON.stringify(obj), httpOptions);
      }
    }