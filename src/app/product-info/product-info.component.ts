import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Models/product';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  public id:number;
  public product:Product;
  errorMessage:string;
  constructor(private route:ActivatedRoute,private service:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((data)=>{
      this.id = data.id;
      console.log(this.id);
      this.service.getProductById(this.id).subscribe((data)=>{
        this.product=data;
        console.log(this.product);
      },(error)=>{
        this.errorMessage="No Details Found !!!"
      })
    })
  }
  back(){
    this.router.navigate(['products']);
  }

}
