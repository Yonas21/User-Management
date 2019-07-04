import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NgFlashMessageService } from 'ng-flash-messages';
import { MustMatch } from './confirm_password';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    createForm: FormGroup;
    gender: string;
  constructor(
      private userService: UserService,
      private router: Router,
      private fb: FormBuilder,
      private flashMessage: NgFlashMessageService) {
      this.createForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: '',
          password: ['', [Validators.required, Validators.minLength(4)]],
          confirm_password: ['', [
              Validators.required
          ]],
          birthday: [''],
          gender: [''],
          email: ['', [
              Validators.required,
              Validators.email
          ]],
          phoneNo: new FormControl('',[
              Validators.required,
              Validators.minLength(4)
          ]),
          address: ['']
      }, {validator: MustMatch('password', 'confirm_password')});
  }
    getValue(event) {
      this.gender = event.target.value;
      console.log(this.gender);
    }
    addUser(firstName, lastName, password, birthday, gender, email, phoneNo, address, confirm) {
      let validPass;
      if (password === confirm) {
          validPass = confirm;
      }
      this.userService.addUser(firstName, lastName, validPass, birthday, this.gender, email, phoneNo, address).subscribe(() => {
          this.flashMessage.showFlashMessage({
            messages: ['user Successfully Registered.'],
            dismissible: true,
            timeout: false,
            type: 'info'
          });
          console.log(`${firstName} ${lastName} ${password} ${birthday} ${phoneNo} ${email} ${address}`);
          this.router.navigate(['/home']);
      });
    }




  ngOnInit() {
  }

}
