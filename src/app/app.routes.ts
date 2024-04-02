import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/Modules/Shared/Components/home/home.component';
import { SidebarComponent } from '../app/Modules/Shared/Components/sidebar/sidebar.component';
import { NavbarComponent } from '../app/Modules/Shared/Components/navbar/navbar.component';
import { ChatComponent } from './Modules/Chat/Components/chat/chat.component';
import { TasksComponent } from './Modules/Tasks/Components/tasks/tasks.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sidebar', component: SidebarComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'tasks', component: TasksComponent },
  ];
  @NgModule({
    
    imports: [RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }