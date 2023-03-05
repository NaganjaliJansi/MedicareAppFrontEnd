import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../Models/product';
import { User } from '../Models/user';
import { ProductService } from '../Services/product.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-buy-products',
  templateUrl: './buy-products.component.html',
  styleUrls: ['./buy-products.component.css']
})
export class BuyProductsComponent implements OnInit {
  public errorMessage:string;
  public productError:string;
  public products!: Array<Product>;
  public user:User;
  public selected: number[]=[];
  public item:any='';  
  public cart:Product[];
  index:number;
  loggedUser:string;
  username:string;
  constructor(private productService:ProductService, private userService:UserService,private router:Router) { }

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
    this.getProducts();
    // this.cart=this.productService.getCart();
    // console.log(this.cart);
   }
  }

  getProducts(){
    this.productService.getProducts().subscribe((data)=>{
      this.products=data;
    },(error)=>{
      this.errorMessage="No Medicine Found! Something Went Wrong !!";
    })
 }

 saveSelected(event:any,index:number){
  this.item=event.target.value;
  if(event.target.checked){      
    this.selected.push(this.item);
  }
  else{
    this.removeItem(this.item);
  }
 }
  removeItem(element: number) {
  this.selected.forEach((value,index)=>{
      if(value==element) this.selected.splice(index,1);
  });
}
gotoCart(){
  if(this.selected.length!=0){
    this.productService.setProducts(this.selected);
    this.router.navigate(['/cart']);
  }
  else{
    this.productError="No Items Selectedd!!"
  }
  
}
}
