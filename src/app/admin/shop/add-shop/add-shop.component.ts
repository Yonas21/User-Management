import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../models/product.model';

const URL = 'http://localhost:4000/shops';
const productUrl = 'http://localhost:4000/products';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {
    shopForm = new FormGroup({
        product: new FormControl(''),
        contact: new FormControl('')
    });
  constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private productService: ProductService
  ) {
      this.productService.getProducts().subscribe((result: ProductModel[]) => {
          for (const data of result) {
              console.log(data._id);
          }
      });
  }

  ngOnInit() {
  }

  onSubmit() {
      // const formData = new FormData();
  }

}
