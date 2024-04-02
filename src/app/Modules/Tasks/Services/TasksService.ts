import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { getTask } from "../Models/getTask";
import { addTask } from "../Models/addTask";
import { deleteTask } from "../Models/deleteTask";

@Injectable({
    providedIn: 'root'
  })
  export class TasksService{
    
      _url:string='https://localhost:7209';
      constructor(private _http:HttpClient){
       
      }

      getAllTasks():Observable<getTask[]>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${localStorage.getItem("token")}`
          })
        }
        
        return this._http.get<getTask[]>(`${this._url}/api/TaskManagment/GetAllTasks`,httpOptions);
    }
    AddTask(obj:addTask):Observable<string>
      {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization':  `Bearer ${localStorage.getItem("token")}`
            })
          }
          return this._http.post<string>(`${this._url}/api/TaskManagment/UpdateTask`,JSON.stringify(obj), httpOptions);
      }
      DeleteTask(obj:deleteTask):Observable<string>
      {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization':  `Bearer ${localStorage.getItem("token")}`
            })
          }
          return this._http.post<string>(`${this._url}/api/TaskManagment/RemoveTask`,JSON.stringify(obj), httpOptions);
      }
  }



