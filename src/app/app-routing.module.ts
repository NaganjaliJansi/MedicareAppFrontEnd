import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { BuyProductsComponent } from './buy-products/buy-products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path:"products",component:ProductListComponent},
  {path:"users",component:UserListComponent},
  {path:"addProduct",component:AddProductComponent},
  {path:"updateProduct/:id",component:AddProductComponent},
  {path:"product/:id",component:ProductInfoComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"editUser/:id",component:SignUpComponent},
  {path:"login",component:LoginComponent},
  {path:"buyNow",component:BuyProductsComponent},
  {path:"cart",component:CartComponent},
  {path:"payment",component:PaymentComponent},
  {path:"**", redirectTo:"products", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
