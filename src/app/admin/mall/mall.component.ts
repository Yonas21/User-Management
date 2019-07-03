import { Component, OnInit } from '@angular/core';
import { MallService } from '../../services/mall.service';
import { MallModel } from '../../models/mall.model';
import { DeleteModel } from '../../models/delete.model';
import { NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';
import {ShopService} from '../../services/shop.service';
import {ShopModel} from '../../models/shop.model';
@Component({
  selector: 'app-mall',
  templateUrl: './mall.component.html',
  styleUrls: ['./mall.component.css']
})
export class MallComponent implements OnInit {
    mall: MallModel;
    malls = [];
  constructor(
      private mallService: MallService,
      private flashMessage: NgFlashMessageService,
      private router: Router,
      private shopService: ShopService
  ) {
      this.mallService.getMalls().subscribe((result: MallModel[]) => {
          for (const data of result) {
              this.mall = new MallModel(data.closing_hour, data._id, data.name, data.shop, data.address, data.contactNo);
              this.mallService.id = this.mall._id;
              for (const shopId of data.shop) {
                  this.shopService.getAShop(shopId).subscribe((shopDetial: ShopModel) => {
                      this.malls.push({
                         shop: shopDetial.name,
                         closing_hour: data.closing_hour,
                         name: data.name,
                         address: data.address,
                         contactNo: data.contactNo,
                         _id: data._id
                     });
                  });
              }
          }
      });

  }

  ngOnInit() {
  }
  deleteMalls(id) {
      this.mallService.DeleteMalls(this.mall._id).subscribe((result: DeleteModel) => {
          if (result.message) {
              this.flashMessage.showFlashMessage({
                  messages: [result.message],
                  dismissible: true,
                  timeout: 4000,
                  type: 'info'
              });
          }
      });
  }

    updateMall(id) {
        this.router.navigate([`/admin/update-mall/${id}`]);
    }

    // findMalls() {
    //   this.mallService.getMalls().subscribe((result: MallModel[]) => {
    //       for (const data of result) {
    //           console.log(data.shop);
    //       }
    //   });
    // }
}
