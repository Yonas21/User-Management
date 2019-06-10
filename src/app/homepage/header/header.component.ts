import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { MallService } from '../../services/mall.service';
import {MallModel} from '../../models/mall.model';
import { ShopService } from '../../services/shop.service';
import {ShopModel} from '../../models/shop.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    shops: Array<string> = [];
  constructor(
      private userService: UserService,
      private flashMessage: NgFlashMessageService,
      private mallService: MallService,
      private shopService: ShopService
      ) {
      this.mallService.getMalls().subscribe((results: MallModel[]) => {
          for (const data of results) {
              this.shops.push(data.name);
              // this.shopService.getAShop(data.shop).subscribe((shop: ShopModel) => {
              //     this.shops.push(shop.name);
              // });
          }
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
