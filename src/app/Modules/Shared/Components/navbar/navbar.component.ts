import { Component } from '@angular/core';
import { authService } from '../../Services/Auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { loginModel } from '../../Models/loginModel';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, DialogModule, FormsModule, MessageModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username:any;
  logoutHidden:boolean=true;
  LoginPopUp:boolean=false;
  message_error_hidden:boolean=true;
  message_content:any;
  LoginUserPassword:any;
  LoginUsername:any;
  constructor(private auth:authService, private router: Router) { 
    this.auth.userInfo().subscribe(res=>{
      if(res != null)
      {
        this.username = "Welcome "+res.username+" !";
        this.logoutHidden=false;
      }
    })
  }
  ngOnInit(): void {
    
  }
  login(txt_username: { value: any; }, txt_password: { value: any; })
  {
    
    let data:loginModel={username:txt_username.value};

  this.auth.login(data).subscribe(
   (res) => {
    if(res.token){
  
    this.auth.loggedIn(res);
   
     this.auth.isUserlogged.next("Yes");
      
     if (String(localStorage.getItem('token')) != '') {
       location.reload();
     }
   
    }
  },
   (error) => {
     if (error.status == 401) {
      this.message_content = "Invalid Username or Password";
     }
   }
 );

    if (String(localStorage.getItem('token')) != '') {
    this.router.navigate(['/']);
    }
  }
  logout(){
    this.auth.loggOut();
    this.ngOnInit();
    this.router.navigate(['/']);
    location.reload();
  }
  viewLogin()
  {
    this.LoginPopUp=true;  
  }
  resetFields() {
    this.LoginUserPassword='';
    this.LoginUsername='';
    this.message_content="";
    this.message_error_hidden=true;
    this.ngOnInit();
   }
}
