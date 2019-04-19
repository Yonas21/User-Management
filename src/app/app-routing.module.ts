import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

// angular components
import { SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {HomepageComponent} from './homepage/homepage.component';

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
