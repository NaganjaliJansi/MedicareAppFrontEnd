import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Models/product';
import { User } from '../Models/user';
import { ProductService } from '../Services/product.service';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public errorMessage:string;
  public products!: Array<Product>;
  public user:User;
  public loggedUser:string;
  constructor(private productService:ProductService,private userService:UserService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedUser=this.userService.getLoggedUser();
    if(this.loggedUser && this.loggedUser!=''){
        this.getProducts();
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  getProducts(){
    this.productService.getProducts().subscribe((data)=>{
      this.products=data;
      console.log(data);
    },(error)=>{
      this.errorMessage="No Medicine Found! Something Went Wrong !!";
    })
  }
  edit(id:number){
    this.router.navigate(['/updateProduct/',id]);
  }
  delete(id:number){
    this.productService.delete(id).subscribe((data)=>{
    this.getProducts();
    })
  }
  view(id:number){
    this.router.navigate(['/product/',id]);
  }
}

