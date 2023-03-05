import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggerUser:string;  
  constructor(private http:HttpClient) { }
  getUsers(){
   return this.http.get<User[]>("http://localhost:8080/users");
  }
  addUser(user: any):Observable<any>{
    return this.http.post("http://localhost:8080/addUser",user);
  }
  delete(id:number){
    return this.http.delete("http://localhost:8080/deleteUser/"+id);
  }
  getUser(id:number){
    return this.http.get<User>("http://localhost:8080/user/"+id);
  }
  UpdateUser(user:User,id:number){
    return this.http.put("http://localhost:8080/updateUser/"+id,user); 
  }
  findByEmail(user:User){
    return this.http.post("http://localhost:8080/login",user);
  }
  setLoggedUser(user:string){
    this.loggerUser = user;
  }
  getLoggedUser(){
    return this.loggerUser;
  }
  getByEmail(email:string){
    return this.http.get<User>("http://localhost:8080/getUser/"+email);
  }
  
}
