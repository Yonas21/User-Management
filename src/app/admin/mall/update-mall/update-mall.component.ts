import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ShopService} from '../../../services/shop.service';
import {ShopModel} from '../../../models/shop.model';
import {DeleteModel} from '../../../models/delete.model';
import { NgFlashMessageService} from 'ng-flash-messages';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

const URL = 'http://localhost:4000/mall';
@Component({
  selector: 'app-update-mall',
  templateUrl: './update-mall.component.html',
  styleUrls: ['./update-mall.component.css']
})
export class UpdateMallComponent implements OnInit {
    shops = [];
    updateMallForm: FormGroup;
    dropDownList = [];
    productNames = [];
    selectedItems = [];
    dropdownSetting = {};
  constructor(
      private http: HttpClient,
      private shopService: ShopService,
      private flashMessage: NgFlashMessageService,
      private formBuilder: FormBuilder
  ) {
      this.shopService.getShops().subscribe((result: ShopModel[] ) => {
          for (const data of result) {
              this.dropDownList.push({value: data._id, name: data.name});
          }
      });
      this.UpdateForm();
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
        console.log(item);
    }
    onSelectAll(items: any) {
        this.selectedItems.push(items);
        console.log(items);
    }
    onItemUnSelect(item: any) {
        this.selectedItems.reduce(item);
        console.log(item);
    }
    onUnselectAll(items: any) {
        this.selectedItems.reduce(items);
        console.log(items);
    }
    updateMall(newName: string, newAddress: string, newContact: string, newItem: string, newClosing: string) {
        const id = window.location.pathname.substr(19, 24);
        let Ids: any[];
        Ids = this.selectedItems.map(e => e.value);
        const mall = {
            newName,
            newAddress,
            newContact,
            Ids,
            newClosing
        };
        console.log(Ids);
        this.http.patch(`${URL}/${id}`, mall, {responseType: 'json'}).subscribe((result: DeleteModel) => {
           this.flashMessage.showFlashMessage({
               messages: [result.message],
               dismissible: true,
               timeout: 4000,
               type: 'info'
           });
        });
    }
    UpdateForm() {
      this.updateMallForm = this.formBuilder.group({
          newName: new FormControl('', Validators.required),
          newAddress: new FormControl('', Validators.required),
          newContact: new FormControl('', Validators.required),
          newClosing: new FormControl('', Validators.required),
          newShop: new FormControl('', Validators.required)
      });
    }
}
