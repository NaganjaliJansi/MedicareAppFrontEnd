import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users:Array<User>
  public errorMessage:string;
  loggedUser:string;
  constructor(private service:UserService, private router:Router) { }

  ngOnInit(): void {
    this.loggedUser = this.service.getLoggedUser();
    
    if(!this.loggedUser || this.loggedUser==''){
      this.router.navigate(['/login']);
     }
     else{
      this.getUsers();
     }
   
  }
  getUsers(){
    this.service.getUsers().subscribe((data)=>{
      this.users=data;
      console.log(this.users);
    },(error)=>{
      this.errorMessage="Something went wrong!!";
    })
  }
  delete(id:number){
      alert("Do you want to delete ?");
      this.service.delete(id).subscribe((data)=>{
         this.getUsers();
      })
  }
  edit(id:number){
      this.router.navigate(['/editUser/',id]);
  }
  view(id:number){

  }
}
