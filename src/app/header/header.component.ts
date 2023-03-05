import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser:string;
  constructor(private service:UserService,private router:Router) { }

  ngOnInit(): void {
    this.loggedUser = this.service.getLoggedUser();
  }
  logout(){
    alert("You have been logged out!!");
    this.loggedUser='';
    this.service.setLoggedUser(this.loggedUser);
    this.router.navigate(['/login']);
  }
}
