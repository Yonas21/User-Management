import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
          name: new FormControl(''),
          quantity: new FormControl(''),
          description: new FormControl(''),
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
        formData.append('productImage', this.orderForm.get('productImage').value);
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
