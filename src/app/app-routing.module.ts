import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './auth.guard';

// angular components
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PageNotFoundComponent } from './homepage/page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { ProductComponent} from './admin/product/product.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { UpdateProductComponent } from './admin/product/update-product/update-product.component';
import { MallComponent } from './admin/mall/mall.component';
import { ShopComponent } from './admin/shop/shop.component';
import { AddMallComponent } from './admin/mall/add-mall/add-mall.component';
import { MallsComponent} from './malls/malls.component';
import { ProductShopMallComponent } from './product-shop-mall/product-shop-mall.component';
import { SpecialOrderComponent } from './special-order/special-order.component';
import { UpdateBalanceComponent } from './admin/update-balance/update-balance.component';
// @ts-ignore
import { UpdateMallComponent } from './admin/mall/update-mall/update-mall.component';
import { AddShopComponent } from './admin/shop/add-shop/add-shop.component';
// @ts-ignore
import { UpdateMallComponent } from './admin/mall/update-mall/update-mall.component';
import {UpdateShopComponent} from './admin/shop/update-shop/update-shop.component';
import {OrdersComponent} from './admin/orders/orders.component';
import {PaymentComponent} from './payment/payment.component';
import {ContactInfoComponent} from './admin/contact-info/contact-info.component';
import { CheckoutInfoComponent } from './admin/checkout-info/checkout-info.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
                    {
                        path: 'products',
                        component: ProductComponent
                    },
                    {
                        path: 'add-product',
                        component: AddProductComponent
                    },
                    {
                        path: 'update-product/:id',
                        component: UpdateProductComponent
                    },
                    {
                        path: 'malls',
                        component: MallComponent
                    },
                    {
                        path: 'shops',
                        component: ShopComponent
                    },
                    {
                        path: 'add-mall',
                        component: AddMallComponent
                    },
                    {
                        path: 'update-mall/:id',
                        component: UpdateMallComponent
                    },
                    {
                        path: 'add-shop',
                        component: AddShopComponent
                    },
                    {
                        path: 'update-shop/:id',
                        component: UpdateShopComponent
                    },
                    {
                        path: 'orders',
                        component: OrdersComponent
                    },
            {
                path: 'update-balance',
                component: UpdateBalanceComponent
            },
            {
                path: 'contact-info',
                component: ContactInfoComponent
            },
            {
                path: 'checkout-info',
                component: CheckoutInfoComponent
            }
        ]
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
      path: 'cart',
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
      path: 'product_category',
      component: ProductCategoryComponent
    },
    {
      path: 'product_detail',
      component: ProductDetailComponent
    },
    {
      path: 'wishlist',
      component:  WishlistComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'mall/:id',
        component: MallsComponent
    },
    {
        path: 'find-product/:id',
        component: ProductShopMallComponent
    },
    {
        path: 'special-order',
        component: SpecialOrderComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'payment',
        component: PaymentComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
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
