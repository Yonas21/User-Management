import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule} from 'angular-font-awesome';
import {UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
    LinkedInLoginProvider
} from 'angularx-social-login';

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
import { AdminComponent } from './admin/admin.component';
import { ProductComponent } from './admin/product/product.component';
import { MallComponent } from './admin/mall/mall.component';
import { AuthGuard } from './auth.guard';
import {ProductService} from './services/product.service';

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
      AdminComponent,
      ProductComponent,
      MallComponent,
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
      SocialLoginModule
  ],
  providers: [
      UserService,
      {provide: AuthServiceConfig, useFactory: provideConfig},
      AuthGuard,
      UserService,
      ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
