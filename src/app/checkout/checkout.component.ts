import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {CheckoutModel} from '../models/checkout.model';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
      private router: Router,
      private userService: UserService,
      public navCtl: NgxNavigationWithDataComponent,
      private flashMessage: NgFlashMessageService
      ) {
      // console.log(this.navCtl.data);
      // console.log(this.navCtl.get('price'));
  }

  ngOnInit() {
  }

    checkOutFromAccount(username, password) {
        this.userService.authenticateUser(username, password).subscribe((result: CheckoutModel) => {
            const checkout = result.balance - this.navCtl.get('price');
            console.log(result.balance);
            if (checkout < 0) {
                this.flashMessage.showFlashMessage({
                    messages: ['unable to checkout, because balance is too low.'],
                    dismissible: true,
                    timeout: 5000,
                    type: 'danger'
                });
            } else {
                this.flashMessage.showFlashMessage({
                    messages: ['successfully checkedout'],
                    dismissible: true,
                    timeout: 4000,
                    type: 'success'
                });
                this.router.navigate(['/home']);
            }
        });

    }
}
