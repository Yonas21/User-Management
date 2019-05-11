import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService} from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';


// @ts-ignore
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private message: string;
  private user: SocialUser;
  private loggedIn: boolean;

    constructor(
      private userService: UserService,
      private router: Router,
      private flashMessage: NgFlashMessageService,
      private fb: FormBuilder,
      private authService: AuthService
      ) {
        this.loginForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });
      }

      onLoginSubmit(username, password) {
        this.userService.authenticateUser(username, password).subscribe(data => {

          if (!data) {
            this.flashMessage.showFlashMessage({
              messages: ['unable to find data'],
              dismissible: true,
               timeout: false,
               type: 'danger'
            });
          } else {
            const arr = [];
            for (const message in data) {
              if (data.hasOwnProperty(message)) {
                arr.push(data[message]);

                this.userService.saveToken(arr[1]);


                this.flashMessage.showFlashMessage({
                  messages: ['Logged in Successfully.'],
                  dismissible: true,
                  timeout: 5000,
                  type: 'success'
                });
              }
            }


            this.router.navigate(['/home']);
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


}
