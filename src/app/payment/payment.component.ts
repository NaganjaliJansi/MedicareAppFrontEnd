import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../Models/product';
import { User } from '../Models/user';
import { ProductService } from '../Services/product.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartProducts:Product[];
  amount:number;
  id:number;
  loggedUser:string;
  user:User;
  username:string;
  constructor(private productService:ProductService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser();
    this.userService.getByEmail(this.loggedUser).subscribe((data)=>{
      this.user = data;
      this.username = this.user.firstName;
    })
    if(!this.loggedUser || this.loggedUser==''){
     this.router.navigate(['/login']);
    }
    else{
      this.cartProducts = this.productService.getCart();
      this.amount = this.productService.getAmount();
      this.id=this.getRandomIntInclusive(1000,9999);
   
    }
  
  }
  getRandomIntInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }

}
