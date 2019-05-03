import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  private message: String;

    constructor(
      private userService: UserService, 
      private router: Router,
      private flashMessage: NgFlashMessageService,
      private fb: FormBuilder
      ) {
        this.loginForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        })
      }

      onLoginSubmit(username, password) {
        this.userService.authenticateUser(username, password).subscribe(data => {
          
          if(!data) {
            this.flashMessage.showFlashMessage({
              messages: ["unable to find data"],
              dismissible: true,
               timeout: false,
               type: 'danger'
            })
          } else {
            let arr = [];
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
            
            
            // this.router.navigate(['/home']);
          }
        })

      }

    ngOnInit() {}

    
}
