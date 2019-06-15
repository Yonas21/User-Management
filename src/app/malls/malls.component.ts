import {Component, Input, OnInit} from '@angular/core';
import { MallService} from '../services/mall.service';
import { MallModel} from '../models/mall.model';
import {Router} from '@angular/router';
import { ShopMallService} from '../services/shop_mall.service';
import { ShopService } from '../services/shop.service';
import {HeaderComponent} from '../homepage/header/header.component';
import {ShopModel} from '../models/shop.model';

@Component({
  selector: 'app-malls',
  templateUrl: './malls.component.html',
  styleUrls: ['./malls.component.css']
})
export class MallsComponent implements OnInit {
     malls: Array<MallModel> = [];
     products = [];
     shopIdArray = [];

     isOpen = false;
     shopArray: Array<ShopModel> = [];

    @Input() headerComponent: HeaderComponent;
  constructor(private mallService: MallService,
              private router: Router,
              private shopMallService: ShopMallService,
              private shopService: ShopService
              ) {}

  ngOnInit() {

      this.shopMallService.change.subscribe(item => {
          this.shopIdArray = item.shop;
          for (const i of item.shop) {
              this.shopService.getAShop(i).subscribe((shopDetial: ShopModel) => {
                   this.shopArray.push(shopDetial);
              });
          }
      });
  }


    showProductsFromShop(value: string[]) {
        for (const data of value) {
            console.log(data);
        }
    }
}
