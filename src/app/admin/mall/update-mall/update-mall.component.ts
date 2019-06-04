import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ShopService} from '../../../services/shop.service';
import {ShopModel} from '../../../models/shop.model';
import {DeleteModel} from '../../../models/delete.model';
import { NgFlashMessageService} from 'ng-flash-messages';

const URL = 'http://localhost:4000/mall';
@Component({
  selector: 'app-update-mall',
  templateUrl: './update-mall.component.html',
  styleUrls: ['./update-mall.component.css']
})
export class UpdateMallComponent implements OnInit {
    shops = [];
  constructor(
      private http: HttpClient,
      private shopService: ShopService,
      private flashMessage: NgFlashMessageService
  ) {
      this.shopService.getShops().subscribe((result: ShopModel[] ) => {
          for (const data of result) {
              this.shops.push({name: data.name, value: data._id});
          }
      });
  }

  ngOnInit() {
  }

    updateMall(name: string, address: string, contact: string, item: string, closing: string) {
        const id = window.location.pathname.substr(19, 24);
        const mall = {
            name,
            address,
            contact,
            item,
            closing
        };
        this.http.patch(`${URL}/:${id}`, mall, {responseType: 'json'}).subscribe((result: DeleteModel) => {
           this.flashMessage.showFlashMessage({
               messages: [result.message],
               dismissible: true,
               timeout: 4000,
               type: 'info'
           });
        });
    }
}
