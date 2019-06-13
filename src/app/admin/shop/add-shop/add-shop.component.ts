import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../models/product.model';
import { ShopService } from '../../../services/shop.service';
import {DeleteModel} from '../../../models/delete.model';
import { NgFlashMessageService } from 'ng-flash-messages';

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
        contactNo: new FormControl(''),
        items: new FormControl('')
    });
     productNames = [];
     id = null;
     dropDownList = [];
     selectedItems = [];
     dropdownSetting = {};
  constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private productService: ProductService,
      private shopService: ShopService,
      private flashMessage: NgFlashMessageService
  ) {
      this.productService.getProducts().subscribe((result: ProductModel[]) => {
          for (const data of result) {
              this.productNames.push({name: data.name, value: data._id});
              this.dropDownList.push( {value: data._id, name: data.name});
          }
      });
  }

  ngOnInit() {
      this.shopForm = this.formBuilder.group({
          name: ['', Validators.required],
          item: ['', Validators.required],
          contactNo: ['', Validators.required],
          items: ['', Validators.required]
      });

      this.dropdownSetting = {
          singleSelection: false,
          idField: 'value',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 10,
          allowSearchFilter: true
      };
  }
    onItemSelect(item: any) {
      this.selectedItems.push(item);
    }
    onSelectAll(items: any) {
        this.selectedItems.push(items);
    }
    onItemUnSelect(item: any) {
        this.selectedItems.reduce(item);
    }
    onUnselectAll(items: any) {
        this.selectedItems.reduce(items);
    }

    AddShop(name: string, item: string, contactNo: string) {
       this.shopService.addShops(name, this.selectedItems.map(e => e.value), contactNo).subscribe((result: DeleteModel) => {
           this.flashMessage.showFlashMessage({
               messages: [result.message],
               dismissible: true,
               timeout: 4000,
               type: 'info'
           });
       });
    }
}
