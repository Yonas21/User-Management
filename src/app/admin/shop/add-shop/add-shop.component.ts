import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../models/product.model';
import { ShopService } from '../../../services/shop.service';

const URL = 'http://localhost:4000/shop/';
@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {
    shopForm = new FormGroup({
        name: new FormControl(''),
        item: new FormControl(''),
        contactNo: new FormControl('')
    });
     productNames = [];
     id = null;
  constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private productService: ProductService,
      private shopService: ShopService
  ) {
      this.productService.getProducts().subscribe((result: ProductModel[]) => {
          for (const data of result) {
              this.productNames.push({name: data.name, value: data._id});
          }
      });
      this.shopForm = this.formBuilder.group({
          name: ['', Validators.required],
          item: ['', Validators.required],
          contactNo: ['', Validators.required]
      });
  }

  ngOnInit() {
      this.shopForm = this.formBuilder.group({
          name: [''],
          item: [''],
          contactNo: ['']
      });
  }

    selectedOptions(event) {
        if (event.target.value.length > 0) {
            const selected  = event.target.value;
            this.shopForm.get('item').setValue(selected);
        }
    }
    AddShop(name: string, item: string, contactNo: string) {
       this.shopService.addShops(name, item, contactNo).subscribe(result => {
           console.log(result);
       });
    }
}
