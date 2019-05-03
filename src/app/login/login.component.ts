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
          console.log(data);
          this.router.navigate(['/home']);
        })

      }

    ngOnInit() {}

    
}
