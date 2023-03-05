import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  foodSelected:number[];
  amount:number;
  cartProducts:Product[];

  private paramSource = new BehaviorSubject(null);
  //sharedParam = this.paramSource.asObservable();
  constructor(private http:HttpClient) { }
  getProducts(){
    return this.http.get<Product[]>("http://localhost:8080/allProducts");
  }
  addProduct(product: any):Observable<any>{
    return this.http.post("http://localhost:8080/addProduct",product);
  }
  getProductById(id:number){
    return this.http.get<Product>("http://localhost:8080/getProduct/"+id);
  }
  UpdateProduct(product:Product,id:number){
    return this.http.put("http://localhost:8080/updateProduct/"+id,product); 
  }
  delete(id:number){
    return this.http.delete("http://localhost:8080/deleteProduct/"+id);

  }
  setProducts(products : number[]){
    this.foodSelected = products;
  }
   getCartProducts(){
     return this.foodSelected;
   }
   setAmount(amount:number){
    this.amount = amount;
   }
   getAmount(){
    return this.amount;
   }
   setCart(products:Product[]){
      this.cartProducts=products;
   }
   getCart(){
    return this.cartProducts;
   }
}
