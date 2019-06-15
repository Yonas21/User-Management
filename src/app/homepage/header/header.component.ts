import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { MallService } from '../../services/mall.service';
import {MallModel} from '../../models/mall.model';
import { ShopService } from '../../services/shop.service';
import { ShopMallService} from '../../services/shop_mall.service';
import {ShopModel} from '../../models/shop.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    shops: Array<MallModel> = [];
  constructor(
      private userService: UserService,
      private flashMessage: NgFlashMessageService,
      private mallService: MallService,
      private shopService: ShopService,
      private shopMallService: ShopMallService,
      private router: Router
      ) {
      this.mallService.getMalls().subscribe((results: MallModel[]) => {
          for (const data of results) {
              this.shops.push(data);
          }
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
