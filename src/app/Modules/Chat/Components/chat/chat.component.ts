import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { ChatService } from '../../Services/ChatService';
import { Subscription } from 'rxjs';
import { authService } from '../../../Shared/Services/Auth';
//import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { getChatHistory } from '../../Models/getChatHistory';



@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule, DialogModule, FormsModule,
     MessageModule, ButtonModule, TabViewModule,DropdownModule, InputTextModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: { user: string, message: string }[] = [];
  message = '';
  from='';
  messageSubscription: Subscription;
  selectedfriend:any;
  friends:any=[];
  checkSelctedFriend:boolean=true;
    
  constructor(private router: Router,private ChatService: ChatService, private auth:authService) { 
    
    this.messageSubscription =  this.ChatService.getMessageSubject().subscribe(msg => {
      this.messages.push(msg);
    });

    this.auth.userInfo().subscribe(res=>{
      this.from=res.username;
    });
debugger;
    this.ChatService.friendsList().subscribe(data=>{
      this.friends = data
    });

}
  sendMessage(to:string) {
    if (this.message.trim() !== '') {
      debugger;
      
      this.ChatService.sendMessage(this.from, this.message,to); 
      
      const msgfrom = {
        user: this.from,
        message: this.message
      };
      debugger;
      this.messages.push(msgfrom);
      this.message = '';
      
    }
  }  
  ngOnInit(): void {
    
  }
  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
  onFriendSelectionChange(event: any) {
    if(this.selectedfriend == null)
    {
      this.checkSelctedFriend = true;

    }
    else
    {
      this.checkSelctedFriend =false;
      debugger;
      let data:getChatHistory={
        recipient: this.selectedfriend
      }
        this.ChatService.getChatHistory(data).subscribe(res=>{
          console.log(res);
          this.messages = res;
        });

    }
    
    
  }
}
