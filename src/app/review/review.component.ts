import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import {HttpClient} from '@angular/common/http';
const URL = 'http://localhost:4000/review';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    rate  = 0;
    token: string;
    reviewForm = new FormGroup( {
        email: new FormControl(''),
        phone: new FormControl(''),
        message: new FormControl('')
    });
  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private http: HttpClient
      ) {
      this.reviewForm = this.formBuilder.group({
          email: ['', Validators.required],
          phone: ['', Validators.required],
          message: ['', Validators.required]
      });
      this.token = this.userService.getToken();
  }

  ngOnInit() {
  }

    rate3() {
      this.rate = 3;
      console.log(this.rate);
    }

    rate1() {
      this.rate = 1;
      console.log(this.rate);
    }

    rate2() {
      this.rate = 2;
      console.log(this.rate);
    }

    rate4() {
      this.rate = 4;
      console.log(this.rate);
    }

    rate5() {
      this.rate = 5;
      console.log(this.rate);
    }
    onSubmit() {
      const formData = new FormData();
      console.log(this.reviewForm.get('email').value);
      formData.append('email', this.reviewForm.get('email').value);
      formData.append('phone', this.reviewForm.get('phone').value);
      formData.append('message', this.reviewForm.get('message').value);
      formData.append('rate', this.rate.toString());
      formData.append('token', this.token);
      this.http.post(`${URL}`, formData, {responseType: 'json'}).subscribe(result => {
          console.log(result);
      });
    }

    addComment(email: string, phone: string, message: string, rate: string, token: string) {
        const commentPayload = {
            email,
            phone,
            message,
            rate: this.rate,
            token: this.token
        };
        console.log(this.token);
        this.http.post(`${URL}`, commentPayload, {responseType: 'json'}).subscribe(result => {
            console.log(result);
        });
    }
}
