import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule} from 'angular-font-awesome';
import {UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSelectDirective } from 'ng2-file-upload';
import { NgxUploaderModule } from 'ngx-uploader';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { RatingModule } from 'ng-starrating';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
    LinkedInLoginProvider
} from 'angularx-social-login';
import { MatTableModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './homepage/header/header.component';
import { FooterComponent } from './homepage/footer/footer.component';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './homepage/page-not-found/page-not-found.component';
import { MallComponent } from './admin/mall/mall.component';
import { AuthGuard } from './auth.guard';
import {ProductService} from './services/product.service';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { UpdateProductComponent } from './admin/product/update-product/update-product.component';
import {AdminComponent} from './admin/admin.component';
import {ProductComponent} from './admin/product/product.component';
import {ShopComponent} from './admin/shop/shop.component';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';


import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AddMallComponent } from './admin/mall/add-mall/add-mall.component';
import { UpdateMallComponent } from './admin/mall/update-mall/update-mall.component';
import { AddShopComponent } from './admin/shop/add-shop/add-shop.component';
import { UpdateShopComponent } from './admin/shop/update-shop/update-shop.component';
import { CommentComponent } from './comment/comment.component';
import { ReviewComponent } from './review/review.component';
import { MallsComponent } from './malls/malls.component';
import { ShopMallService } from './services/shop_mall.service';
import { ProductShopMallComponent } from './product-shop-mall/product-shop-mall.component';
import { SpecialOrderComponent } from './special-order/special-order.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UpdateBalanceComponent } from './admin/update-balance/update-balance.component';
import { ContactInfoComponent } from './admin/contact-info/contact-info.component';
import { CheckoutInfoComponent } from './admin/checkout-info/checkout-info.component';
registerLocaleData(en);

const antDesignIcons = AllIcons as {
    [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('428116568453-031dv7r6fa181279ib9pvd6ivki172fs.apps.googleusercontent.com')
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('2050277175285621')
    },
    {
        id: LinkedInLoginProvider.PROVIDER_ID,
        provider: new LinkedInLoginProvider('LinkedIn-client-Id')
    }
]);

export function provideConfig() {
    return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomepageComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailComponent,
    ProductCategoryComponent,
    ContactComponent,
    WishlistComponent,
    CartComponent,
    CheckoutComponent,
      PageNotFoundComponent,
      MallComponent,
      AddProductComponent,
      UpdateProductComponent,
      AdminComponent,
      ProductComponent,
      ShopComponent,
      FileSelectDirective,
      AddMallComponent,
      UpdateMallComponent,
      AddShopComponent,
      UpdateShopComponent,
      CommentComponent,
      ReviewComponent,
      MallsComponent,
      ProductShopMallComponent,
      SpecialOrderComponent,
      OrdersComponent,
      PaymentComponent,
      UpdateBalanceComponent,
      ContactInfoComponent,
      CheckoutInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      AngularFontAwesomeModule,
      HttpClientModule,
      BrowserAnimationsModule,
      NgFlashMessagesModule.forRoot(),
      SocialLoginModule,
      NgZorroAntdModule,
      NgxUploaderModule,
      NgMultiSelectDropDownModule.forRoot(),
      NgxPayPalModule,
      MDBBootstrapModule.forRoot(),
      RatingModule,
      MatTableModule
  ],
  providers: [
      UserService,
      {provide: AuthServiceConfig, useFactory: provideConfig},
      { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons },
      AuthGuard,
      UserService,
      ProductService,
      ShopMallService,
      NgxNavigationWithDataComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
