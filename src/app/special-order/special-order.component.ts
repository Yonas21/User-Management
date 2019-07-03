import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DeleteModel} from '../models/delete.model';
import { NgFlashMessageService } from 'ng-flash-messages';

const URL = 'http://localhost:4000/orders/';
@Component({
  selector: 'app-special-order',
  templateUrl: './special-order.component.html',
  styleUrls: ['./special-order.component.css']
})
export class SpecialOrderComponent implements OnInit {
    orderForm: FormGroup;
  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private flashMessage: NgFlashMessageService
  ) { }

  ngOnInit() {
      this.orderForm = this.formBuilder.group({
          name: new FormControl('', [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(50)
          ]),
          quantity: new FormControl('',[
              Validators.required,
                  Validators.minLength(1),
                  Validators.maxLength(50)
              ]),
          phone_no: new FormControl('',[
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(15)
          ]),
          description: new FormControl('', [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(200)
          ]),
          productImage: new FormControl('')
      });
  }

  onChange(event) {
      if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.orderForm.get('productImage').setValue(file);
      }
  }

  onSubmit() {
        const formData = new FormData();
        formData.append('name', this.orderForm.get('name').value);
        formData.append('quantity', this.orderForm.get('quantity').value);
        formData.append('description', this.orderForm.get('description').value);
        formData.append('phone_no', this.orderForm.get('phone_no').value);
        formData.append('productImage', this.orderForm.get('productImage').value);
        console.log(this.orderForm.get('phone_no').value);
        this.http.post<any>(URL, formData).subscribe((result: DeleteModel) => {
          if (result) {
              this.flashMessage.showFlashMessage({
                  messages: [result.message],
                  dismissible: true,
                  timeout: 4000,
                  type: 'success'
              });
          }
      });
    }
}
