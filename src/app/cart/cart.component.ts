import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { Product } from '../Models/product';
import { ProductService } from '../Services/product.service';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartProducts:number[];
  public product:Product;
  public cart:Product[]=[];
  public id:number;
  public totalCost:number;
  public paymentForm:FormGroup;
  public popup = false;
  public amount:number;
  loggedUser:string;
  constructor(
    private userService:UserService,
    private productService:ProductService,
    private router:Router,
    private fb:FormBuilder
    ) { }
  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser();
    
    if(!this.loggedUser || this.loggedUser==''){
      this.router.navigate(['/login']);
     }
     else{
      this.cartProducts= this.productService.getCartProducts();
      this.cartProducts.forEach((currentValue, index)=>{
        this.productService.getProductById(currentValue).subscribe((data)=>{
          this.product=data;
          this.product.quantity=1;
          this.product.totalCost=data.cost;
          this.cart.push(this.product);
          this.getTotal();
          this.productService.setCart(this.cart);
          this.productService.setAmount(this.amount);
        })
        
      })
     }
   
    
    this.paymentForm = this.fb.group({
      emailId: ['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      cardNumber: [' ', [Validators.required, Validators.pattern('^[ 0-9]*$'), Validators.maxLength(16)]]
    })
    
  } 
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  increment(product:Product,quantity:number){
      //console.log(product);
      product.quantity++;
      product.totalCost=product.quantity * product.cost;
      this.amount +=product.totalCost;
      this.getTotal();
      this.productService.setAmount(this.amount);
  }
  decrement(product:Product,quantity:number){
    product.quantity--;
    product.totalCost=product.quantity * product.cost;
    this.amount +=product.totalCost;
    this.getTotal();
    this.productService.setAmount(this.amount);
  }

  gotoProducts(){
    this.router.navigate(['/buyNow']);
  }
  payNow(){
   
   this.router.navigate(["/payment"]);
  }
  getTotal(){
    this.amount= this.cart.map(t => t.totalCost).reduce((acc, value) => acc + value, 0);
  }
}
