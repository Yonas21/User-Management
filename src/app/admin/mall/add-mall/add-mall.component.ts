import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, Form} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ShopService } from '../../../services/shop.service';
import { ShopModel } from '../../../models/shop.model';
import { MallService } from '../../../services/mall.service';

@Component({
  selector: 'app-add-mall',
  templateUrl: './add-mall.component.html',
  styleUrls: ['./add-mall.component.css']
})
export class AddMallComponent implements OnInit {
    shops = [];
    data: any = {};
    mallForm: FormGroup;
    shopName = [];
    dropDownList = [];
    selectedItems = [];
    dropdownSetting = {};
  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private shopService: ShopService,
      private mallService: MallService
      ) {
      this.shopService.getShops().subscribe((result: ShopModel[] ) => {
          for (const data of result) {
              this.shops.push({name: data.name, value: data._id});
              this.shopName.push(data.name);
              this.dropDownList.push( {value: data._id, name: data.name});
          }
      });
      this.createForm();
  }

  ngOnInit() {
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
  addMall(name: string, address: string, contact: string, item: string, closing: string) {
        this.mallService.addMall(name, address, contact, this.selectedItems.map(e => e.value), closing).subscribe(result => {
            console.log(result);
        });
    }

    createForm() {
      this.mallForm = this.formBuilder.group({
          name : new FormControl('', Validators.required),
          address: new FormControl('', Validators.required),
          contact: new FormControl('', Validators.required),
          closing: new FormControl('', Validators.required),
          items: new FormControl('', Validators.required)
      });
    }
}
