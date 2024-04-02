import { Component } from '@angular/core';
import { authService } from '../../Services/Auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { loginModel } from '../../Models/loginModel';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, DialogModule, FormsModule, MessageModule, ButtonModule, CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username:any;
  logoutHidden:boolean=true;
  LoginCardVisible:boolean=false;
  message_error_hidden:boolean=true;
  message_content:any;
  LoginUserPassword:any;
  LoginUsername:any;
  constructor(private auth:authService, private router: Router) { 
    this.auth.userInfo().subscribe(res=>{
      if(res != null)
      {
        this.LoginCardVisible = true;
        //this.username = "Welcome "+res.username+"!";
        //this.logoutHidden=false;
      }
    })
  }
  ngOnInit(): void {
    
  }
  login()
  {
    
    if(this.LoginUsername != "" && this.LoginUsername != null)
    {
  let data:loginModel={username:this.LoginUsername};

  this.auth.login(data).subscribe(
   (res) => {
    if(res.token){
  
    this.auth.loggedIn(res);
    this.message_error_hidden = true;
    this.message_content="";
     this.auth.isUserlogged.next("Yes");
      
     if (String(localStorage.getItem('token')) != '') {
       location.reload();
     }
   
    }
  },
   (error) => {
     if (error.status == 401) {
      this.message_content = "Invalid Username or Password";
      this.message_error_hidden = false;
     }
   }
 );

    if (String(localStorage.getItem('token')) != '') {
    this.router.navigate(['/']);
    }
  }
  else{
    
    this.message_content = "Invalid Username or Password";
    this.message_error_hidden = false;
  }
}
  logout(){
    this.auth.loggOut();
  }
  
  resetFields() {
    this.LoginUserPassword='';
    this.LoginUsername='';
    this.message_content="";
    this.message_error_hidden=true;
    this.ngOnInit();
   }
}
