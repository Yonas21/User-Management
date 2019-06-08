import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFlashMessageService } from 'ng-flash-messages';

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
          password: ['', Validators.required],
          birthday: [''],
          gender: [''],
          email: ['', Validators.required],
          phoneNo: ['', Validators.required],
          address: ['']
      });
  }
    getValue(event) {
      this.gender = event.target.value;
      console.log(this.gender);
    }
    addUser(firstName, lastName, password, birthday, gender, email, phoneNo, address) {
      this.userService.addUser(firstName, lastName, password, birthday, this.gender, email, phoneNo, address).subscribe(() => {
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
