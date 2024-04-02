import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginModel } from '../Models/loginModel';
import { loginResponse } from "../Models/loginResponse";
import { userInfoResponse } from "../Models/userInfoResponse";

@Injectable({
    providedIn: 'root'
  })
  export class authService{
    isUserlogged: BehaviorSubject<string>;
    userToken: BehaviorSubject<string>;
      _url:string='https://localhost:7209';
      
      constructor(private _http:HttpClient){
        this.isUserlogged = new BehaviorSubject<string>(String(localStorage.getItem('IsLoggedIn')));
        this.userToken = new BehaviorSubject<string>(String(localStorage.getItem('token')));
        
      }
      loggedIn(res:any){
        this.isUserlogged.next("Yes");
        localStorage.setItem("IsLoggedIn", "Yes");
        this.userToken.next(res.token);
        localStorage.setItem("token", res.token);
      }
      login(request:loginModel):Observable<loginResponse>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
        return this._http.post<loginResponse>(`${this._url}/api/Auth/GetToken`,JSON.stringify(request),httpOptions);
    }
    userInfo():Observable<userInfoResponse>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization':  `Bearer ${localStorage.getItem("token")}`
        })
      }
      
      return this._http.get<userInfoResponse>(`${this._url}/api/Auth/UserInfo`,httpOptions);
  }
  loggOut(){
    localStorage.clear();
    this.isUserlogged.next("");


  }

}