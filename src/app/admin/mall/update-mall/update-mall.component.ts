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
  constructor(
      private http: HttpClient,
      private shopService: ShopService,
      private flashMessage: NgFlashMessageService,
      private formBuilder: FormBuilder
  ) {
      this.shopService.getShops().subscribe((result: ShopModel[] ) => {
          for (const data of result) {
              this.shops.push({name: data.name, value: data._id});
          }
      });
      this.UpdateForm();
  }

  ngOnInit() {
  }

    updateMall(newName: string, newAddress: string, newContact: string, newItem: string, newClosing: string) {
        const id = window.location.pathname.substr(19, 24);
        const mall = {
            newName,
            newAddress,
            newContact,
            newItem,
            newClosing
        };
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
          newClosing: new FormControl('', Validators.required)
      });
    }
}
