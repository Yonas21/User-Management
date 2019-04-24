import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    createForm: FormGroup;


  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
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


    addUser(firstName, lastName, password, birthday, gender, email, phoneNo, address) {
      this.userService.addUser(firstName, lastName, password, birthday, gender, email, phoneNo, address).subscribe(() => {
          this.router.navigate(['/home']);
      });
    }

  ngOnInit() {
  }

}
