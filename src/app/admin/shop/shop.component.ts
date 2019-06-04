import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ShopModel} from '../../models/shop.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
    shops: Array<ShopModel> = [];
    shop: ShopModel;
  constructor(
      private shopService: ShopService
  ) {
      this.shopService.getShops().subscribe((result: ShopModel[]) => {
          for (const data of result) {
              this.shop = new ShopModel(data._id, data.name, data.item, data.contactNo);
              this.shops.push(data);
              this.shopService.id = data._id;
          }
      });
  }

  ngOnInit() {
  }

    deleteShop() {
        this.shopService.deleteShop(this.shop._id).subscribe(result => {
            console.log(result);
        });
    }
}
