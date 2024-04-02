import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { authService } from '../../Services/Auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  juniper_setting:boolean=true;
  rules:boolean=true;
  amend:boolean=true;
  users:boolean=true;
  logs:boolean=true;
  reports:boolean=true;
  loader: boolean = true;
  authorized:boolean=false;
  constructor(private auth:authService,private router: Router) { }
  
  ngOnInit(): void {
    
  }
  logout(){
    localStorage.clear();
    //this.signin_service.loggOut();
   // this.router.navigate(['/signin']);
  }
}
