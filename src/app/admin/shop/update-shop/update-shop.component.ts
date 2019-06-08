import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ShopService } from '../../../services/shop.service';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../models/product.model';
import {HttpClient} from '@angular/common/http';
import {DeleteModel} from '../../../models/delete.model';
import { NgFlashMessageService} from 'ng-flash-messages';

const URL = 'http://localhost:4000/shop';
@Component({
  selector: 'app-update-shop',
  templateUrl: './update-shop.component.html',
  styleUrls: ['./update-shop.component.css']
})
export class UpdateShopComponent implements OnInit {
    shopForm = new FormGroup({
        newName: new FormControl(''),
        newItem: new FormControl(''),
        newContactNo: new FormControl('')
    });
    productNames = [];
  constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private shopService: ShopService,
      private productService: ProductService,
      private flashMessage: NgFlashMessageService
  ) {
      this.productService.getProducts().subscribe((result: ProductModel[]) => {
          for (const data of result) {
              this.productNames.push({name: data.name, value: data._id});
          }
      });
  }

    ngOnInit() {
        this.shopForm = this.formBuilder.group({
            newName: ['' , Validators.required],
            newItem: ['', Validators.required],
            newContactNo: ['', Validators.required]
        });
    }

    selectedOptions(event) {
        if (event.target.value.length > 0) {
            const selected  = event.target.value;
            this.shopForm.get('newItem').setValue(selected);
        }
    }

    onSubmit(newName, newItem, newContactNo) {
        const id = window.location.pathname.substr(19, 24);
        const shops = {
            newName,
            newItem,
            newContactNo
        };
        console.log(shops.newName);
        this.http.patch(`${URL}/${id}`, shops, { responseType: 'json'}).subscribe((result: DeleteModel) => {
            this.flashMessage.showFlashMessage({
                messages: [result.message],
                dismissible: true,
                timeout: 4000,
                type: 'info'
            });
        });
    }

}
