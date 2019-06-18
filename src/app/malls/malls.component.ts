import {Component, Input, OnInit} from '@angular/core';
import { MallService} from '../services/mall.service';
import { MallModel} from '../models/mall.model';
import {Router} from '@angular/router';
import { ShopMallService} from '../services/shop_mall.service';
import { ShopService } from '../services/shop.service';
import {HeaderComponent} from '../homepage/header/header.component';
import {ShopModel} from '../models/shop.model';
import { ProductService } from '../services/product.service';
import {ProductModel} from '../models/product.model';

@Component({
  selector: 'app-malls',
  templateUrl: './malls.component.html',
  styleUrls: ['./malls.component.css']
})
export class MallsComponent implements OnInit {
     malls: Array<MallModel> = [];
     products = [];
     url = 'http://localhost:4000';
     isOpen = false;
     shopArray: Array<ShopModel> = [];
    @Input() headerComponent: HeaderComponent;
  constructor(private mallService: MallService,
              private router: Router,
              private shopMallService: ShopMallService,
              private shopService: ShopService,
              private productService: ProductService
              ) {}

  ngOnInit() {

      this.shopMallService.change.subscribe(item => {
          for (const i of item.shop) {
              this.shopService.getAShop(i).subscribe((shopDetial: ShopModel) => {
                   this.shopArray.push(shopDetial);
                   console.log('product Id' + shopDetial.item);
                   this.productService.getOneProduct(shopDetial.item).subscribe((productFromShop: ProductModel) => {
                       const image = `${this.url}/${productFromShop.productImage}`;
                       console.log(image);
                       this.products.push(
                           {
                               name: productFromShop.name,
                               color: productFromShop.color,
                               price: productFromShop.price,
                               img: image
                           });
                   });
              });
          }
      });
  }
}
