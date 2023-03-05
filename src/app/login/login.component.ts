import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:User = new User();
  public LoginForm:FormGroup;
  public errorMessage:string;
  public role:string;
  public u:User;
  constructor(private router:Router, private service:UserService, private fb:FormBuilder) { }

  ngOnInit(): void {
    
  }
  login(){
    if(this.user.emailId=="administrator@gmail.com" && this.user.password=="admin@123"){
      this.service.setLoggedUser(this.user.emailId);
      alert("Logged in as Admin!!");
        this.router.navigate(['products']);
    }
    else{
      this.service.findByEmail(this.user).subscribe((data)=>{
        console.log(data);
        this.service.setLoggedUser(this.user.emailId);
        alert("Login Successful!!");
        this.router.navigate(['buyNow']);
      },(error)=>{
        this.errorMessage= " Ivalid User Details. Re-Check your details!";
      })
    }
    
  }
}
