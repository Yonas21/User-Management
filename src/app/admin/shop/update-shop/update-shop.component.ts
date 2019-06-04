import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
        name: new FormControl(''),
        item: new FormControl(''),
        contactNo: new FormControl('')
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

    onSubmit() {
        const id = window.location.pathname.substr(19, 24);
        const formData = new FormData();
        formData.append('name', this.shopForm.get('name').value);
        formData.append('item', this.shopForm.get('item').value);
        formData.append('contactNo', this.shopForm.get('contactNo').value);
        this.http.patch(`${URL}/:${id}`, formData, { responseType: 'json'}).subscribe((result: DeleteModel) => {
            this.flashMessage.showFlashMessage({
                messages: [result.message],
                dismissible: true,
                timeout: 4000,
                type: 'info'
            });
        });
    }
}
