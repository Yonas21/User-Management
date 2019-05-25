import { Component, OnInit } from '@angular/core';
import {FormsModule, FormBuilder, FormGroup, Validators, Form} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    productForm: FormGroup;
  constructor(
      private formBuilder: FormBuilder
  ) {
      this.productForm = this.formBuilder.group({
          userName: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  ngOnInit() {
  }

}
