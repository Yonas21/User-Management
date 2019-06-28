import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { MallService } from '../../services/mall.service';
import {MallModel} from '../../models/mall.model';
import { ShopService } from '../../services/shop.service';
import { ShopMallService} from '../../services/shop_mall.service';
import {Router} from '@angular/router';
import {WishlistModel} from '../../models/wishlist.model';
import {CartModel} from '../../models/cart.model';
import {ProductService} from '../../services/product.service';

// @ts-ignore
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    shops: Array<MallModel> = [];
    private wishlists: number;
    private carts: number;
  constructor(
      private userService: UserService,
      private flashMessage: NgFlashMessageService,
      private mallService: MallService,
      private shopService: ShopService,
      private shopMallService: ShopMallService,
      private router: Router,
      private productService: ProductService
      ) {
      this.mallService.getMalls().subscribe((results: MallModel[]) => {
          for (const data of results) {
              this.shops.push(data);
          }
      });
      this.productService.getWishlists().subscribe((result: WishlistModel[]) => {
          this.wishlists = result.length;
          const duplicates = [];
          for (const data of result) {
              // @ts-ignore
              duplicates.push(data.item.name);
          }
          let count = 0;
          for (let i = 0; i < duplicates.length ; i++) {
              if (duplicates[i] === duplicates[i + 1]) {
                  count += 1;
              }
          }
          console.log('upper products');
      });
      this.productService.getProductFromCart().subscribe((result: CartModel[]) => {
          console.log('.......................................................');
          this.carts = result.length;
          const duplicates = [];
          for (const data of result) {
              // @ts-ignore
              // console.log(data.item.name);
              // @ts-ignore
              duplicates.push(data.item.name);
          }
          const filtered = duplicates.filter((value, index) => {
              return duplicates.indexOf(value) !== index;
          });
          console.log(filtered);
      });
  }

    findMalls(item) {
        this.router.navigate([`/mall/${item}`]);
        this.mallService.getAMall(item).subscribe(result => {
            this.shopMallService.toggle(result);
        });
    }

    onLogoutClick() {
        this.userService.logout();
        this.flashMessage.showFlashMessage({
            messages: ['You Logged out Successfully.'],
            dismissible: true,
            timeout: 5000,
            type: 'info'
        });
    }

  ngOnInit() {
  }


}
