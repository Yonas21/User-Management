import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {CheckoutModel} from '../models/checkout.model';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { NgFlashMessageService } from 'ng-flash-messages';
import {SellsService} from '../services/sells.service';
import { DeleteModel } from '../models/delete.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    count = 0;
  constructor(
      private router: Router,
      private userService: UserService,
      public navCtl: NgxNavigationWithDataComponent,
      private flashMessage: NgFlashMessageService,
      private sellsService: SellsService,
      private productService: ProductService
      ) {
      // console.log(this.navCtl.data);
      // console.log(this.navCtl.get('price'));
  }

  ngOnInit() {
  }

    checkOutFromAccount(username, password) {
        this.userService.authenticateUser(username, password).subscribe((result: CheckoutModel) => {
            const checkout = result.balance - this.navCtl.get('price');
            console.log(result);
            console.log(this.navCtl.get('id'));
            // console.log(this.navCtl.get('price'));
            // console.log(checkout);
            if (checkout < 0) {
                this.flashMessage.showFlashMessage({
                    messages: ['unable to checkout, because balance is too low.'],
                    dismissible: true,
                    timeout: 5000,
                    type: 'danger'
                });
            } else {
                this.flashMessage.showFlashMessage({
                    messages: [result.message],
                    dismissible: true,
                    timeout: 4000,
                    type: 'success'
                });
                this.count += 1;
                this.sellsService.countSells(this.count, this.navCtl.get('id'));
                this.userService.updateBalance(username, checkout).subscribe((result: DeleteModel) =>{
                    this.flashMessage.showFlashMessage({
                        messages: [result.message],
                        dismissible: true,
                        timeout: 4000,
                        type: 'info'
                    });
                });
                this.productService.checkoutInfo(username, this.navCtl.get('id')).subscribe(result => {
                    console.log(result);
                })
                this.router.navigate(['/home']);
            }
        });

    }
}
