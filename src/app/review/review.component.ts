import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import {HttpClient} from '@angular/common/http';
import { StarRatingComponent } from 'ng-starrating';
import {DeleteModel} from '../models/delete.model';
import { NgFlashMessageService } from 'ng-flash-messages';

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
    currentRate: 8;
  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private http: HttpClient,
      private flashMessage: NgFlashMessageService
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

    onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}) {
        this.rate = $event.newValue;
        console.log(this.rate);
    }
    // onSubmit() {
    //   const formData = new FormData();
    //   console.log(this.reviewForm.get('email').value);
    //   formData.append('email', this.reviewForm.get('email').value);
    //   formData.append('phone', this.reviewForm.get('phone').value);
    //   formData.append('message', this.reviewForm.get('message').value);
    //   formData.append('rate', this.rate.toString());
    //   formData.append('token', this.token);
    //   this.http.post(`${URL}`, formData, {responseType: 'json'}).subscribe(result => {
    //       console.log(result);
    //   });
    // }

    addComment(email: string, phone: string, message: string) {
        const commentPayload = {
            email,
            phone,
            message,
            rate: this.rate,
            token: this.token
        };
        console.log(this.token);
        this.http.post(`${URL}`, commentPayload, {responseType: 'json'}).subscribe((result: DeleteModel) => {
            this.flashMessage.showFlashMessage({
                messages: [result.message],
                dismissible: true,
                timeout: 4500,
                type: 'success'
            });
        });
    }


}
