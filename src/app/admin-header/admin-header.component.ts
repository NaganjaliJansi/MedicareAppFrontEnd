import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  loggedUser:string;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.loggedUser =this.userService.getLoggedUser();
  }
  logout(){
    alert("Are You sure to LogOut!!");
    this.loggedUser='';
    this.userService.setLoggedUser(this.loggedUser);
    this.router.navigate(['/login']);
  }

}
