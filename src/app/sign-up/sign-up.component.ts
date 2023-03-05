import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public SignUpForm:FormGroup;
  public user:User = new User();
  public userId:number;
  public button:string="Sign Up";
  public title:string="Sign Up Page";
  public pattern:string ="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  loggedUser:string;
    constructor(private fb:FormBuilder, private service:UserService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userId=this.route.snapshot.params['id'];
    
    this.SignUpForm = this.fb.group({
      id:[{value:this.userId,disabled:true},[Validators.required]],
      firstName:['',{value:this.user.firstName},[Validators.required]],
      lastName:['',{value:this.user.lastName},[Validators.required]],
      mobileNo:['',{value:this.user.mobileNo},[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      emailId:['',{value:this.user.emailId},[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['',{value:this.user.password},[Validators.required]],
    })
    if(this.userId){
      // if(!this.loggedUser || this.loggedUser==''){
      //   this.router.navigate(['/login']);
      //  }
      //  else{
          this.button="Update";
          this.title="Edit User";
          this.service.getUser(this.userId).subscribe((data)=>{
          this.user=data;
        })
      // }
    }
  }
  onSubmit(){
    if(this.userId){
      this.update();
    }
    else{
      this.signUp();
    }
  }
  signUp(){
    const data={
      firstName:this.user.firstName,
      lastName:this.user.lastName,
      emailId:this.user.emailId,
      mobileNo:this.user.mobileNo,
      password:this.user.password
    }
    
      this.service.addUser(data).subscribe((data)=>{
        console.log(this.user);
        alert('User Saved Successfully!!!');
        this.router.navigate(['login']);
      })
  }
  update(){
      this.service.UpdateUser(this.user,this.userId).subscribe((data)=>{
        alert("User Data Updated Successfully!!");
        this.router.navigate(['login']);
      })
  }
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  alphabetsOnly(event: { which: any; keyCode: any; }) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      //event.preventDefault();
      return false;
    }
  }
  
}
