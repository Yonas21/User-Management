import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

// angular components
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from "./contact/contact.component";
import { ProductCategoryComponent } from "./product-category/product-category.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { WishlistComponent } from "./wishlist/wishlist.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomepageComponent
    },
      {
        path: 'signup',
          component: SignupComponent
      },
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path:'cart',
      component: CartComponent
    },
    {
      path: 'checkout',
      component: CheckoutComponent
    },
    {
      path: 'contact',
      component: ContactComponent
    },
    {
      path: 'product-category',
      component: ProductCategoryComponent
    },
    {
      path: 'product-detail',
      component:ProductDetailComponent
    },
    {
      path:'wishlist',
      component:  WishlistComponent
    }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      RouterModule.forRoot(routes)
  ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
