import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AuthService} from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { UserModel } from '../models/user.model';
import {LoginPayloadModel} from '../models/LoginPayload.model';


// @ts-ignore
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

      loginForm: FormGroup;
      private user: SocialUser;
      private loggedIn: boolean;
      users: UserModel[];
      role: string;

    constructor(
      private userService: UserService,
      private router: Router,
      private flashMessage: NgFlashMessageService,
      private fb: FormBuilder,
      private authService: AuthService
      ) {
        this.VaidateLogin();
      }

      onLoginSubmit(username, password) {
        this.userService.authenticateUser(username, password).subscribe((data: LoginPayloadModel) => {
          if (!(data.message === 'Authorized')) {
            this.flashMessage.showFlashMessage({
              messages: ['unable to find data'],
              dismissible: true,
               timeout: false,
               type: 'danger'
            });
          } else {
              if (data.role === 'admin') {
                  this.router.navigate(['/admin']);
            } else {
                  this.router.navigate(['/home']);
              }
              this.flashMessage.showFlashMessage({
                  messages: [data.message],
                  dismissible: true,
                  timeout: 4000,
                  type: 'success'
              });
              this.userService.saveToken(data.token);
          }
        });

      }

    getAllUsers() {
        this.userService.getUsers().subscribe((data: UserModel[]) => {
            this.users = data;
            console.log(`requested users`);
            for (const result of this.users) {
                this.role = result.role;
            }
            if (this.role === 'admin') {
                this.router.navigate(['admin']);
            } else {
                this.router.navigate(['home']);
            }
        });
    }
      signInWithFacebook() {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
      }

    signInWithGoogle() {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    signInWithLinkedIn() {
        this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
    }
    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
        });
    }

    VaidateLogin() {
        this.loginForm = this.fb.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }
}

