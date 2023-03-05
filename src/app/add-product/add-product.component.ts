import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Models/product';
import { ProductService } from '../Services/product.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public product:Product=new Product();
  public productId:number;
  public AddProductForm:FormGroup;
  public Title:string="Create Product";
  public Button:string="Add Product"
  loggedUser:string;
  constructor(private service:ProductService,private userService:UserService, private router:Router,private route:ActivatedRoute, private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.loggedUser = this.userService.getLoggedUser();
    
    if(!this.loggedUser || this.loggedUser==''){
      this.router.navigate(['/login']);
     }
    this.AddProductForm = this.fb.group({
      id:[{value:this.productId,disabled:true},[Validators.required]],
      name:['',{value:this.product.name},[Validators.required]],
      description:['',{value:this.product.description},[Validators.required]],
      brand:['',{value:this.product.brand},[Validators.required]],
      status:['',{value:this.product.status},[Validators.required]],
      cost:['',{value:this.product.cost},[Validators.required, Validators.max(500)]]
    }) 
      this.product.status=true;

      if(this.productId){
        this.Title="Upate Product";
        this.Button="Update";
        this.service.getProductById(this.productId).subscribe((data)=>{
          this.product=data;
        });
      }
}
numberOnly(event: { which: any; keyCode: any; }): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}
onSubmit(){
  if(this.productId){
    this.UpdateProduct();
  }
  else{
    this.addProduct();
  }
}
  addProduct(){
    const data={
      name:this.product.name,
      description:this.product.description,
      brand:this.product.brand,
      cost:this.product.cost,
      status:this.product.status
    }
    this.service.addProduct(data).subscribe((data)=>{
     
       alert('Product Saved!!!');
       this.router.navigate(['products']);
    })
  }
  UpdateProduct(){
    this.service.UpdateProduct(this.product,this.productId).subscribe((data)=>{
      alert("Data Updated Successfully!!");
      this.router.navigate(['products']);
    })
  }
  
}