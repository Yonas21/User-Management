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
        newContactNo: new FormControl(''),
        items: new FormControl('')
    });
    productNames = [];
    dropDownList = [];
    selectedItems = [];
    dropdownSetting = {};
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
              this.dropDownList.push( {value: data._id, name: data.name});
          }
      });
  }

    ngOnInit() {
        this.shopForm = this.formBuilder.group({
            newName: ['' , Validators.required],
            newItem: ['', Validators.required],
            newContactNo: ['', Validators.required],
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


    onSubmit(newName, newItem, newContactNo) {
        const id = window.location.pathname.substr(19, 24);
        let Ids: any[];
        Ids = this.selectedItems.map(e => e.value);
        const shops = {
            newName,
           Ids,
            newContactNo
        };
        console.log(id);
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
