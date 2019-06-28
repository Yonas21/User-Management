import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ProductService} from '../services/product.service';
import {ProductModel} from '../models/product.model';
import {UserModel} from '../models/user.model';
import {DeleteModel} from '../models/delete.model';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import {SellsService} from '../services/sells.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    products: Array<ProductModel> = [];
    users: Array<UserModel> = [];
    url = 'http://localhost:4000';
    count = 0;
    product: ProductModel;
    user: UserModel;
    constructor(
        private userService: UserService,
        private router: Router,
        private flashMessage: NgFlashMessageService,
        private productService: ProductService,
        public  navCtl: NgxNavigationWithDataComponent,
        private sellsService: SellsService
    ) {}

    ngOnInit() {
        this.productService.getProducts().subscribe((data: ProductModel[]) => {
            for (const oneData of data) {
                const image = `${this.url}/${oneData.productImage}`;
                this.product  = new ProductModel(oneData._id, oneData.name, oneData.price, oneData.color, image);
                this.products.push(this.product);
            }
        });
        this.userService.getUsers().subscribe((result: UserModel[]) => {
            for (const res of result) {
                this.user = new UserModel(res._id, res.email, res.password, res.role);
                this.users.push(this.user);
            }
        });

    }

    addToWishlist(productId) {
        this.count += 1;
        this.productService.addToWishlist(productId).subscribe((data: DeleteModel) => {
            this.flashMessage.showFlashMessage({
                messages: [data.message],
                dismissible: true,
                timeout: 4000,
                type: 'info'
            });
        });
        this.sellsService.countSells(this.count, productId).subscribe(result => {
            console.log(result);
        });
    }

    addToCart(productId) {
        this.productService.addToCart(productId).subscribe((result: DeleteModel) => {
            this.flashMessage.showFlashMessage({
                messages: [result.message],
                dismissible: true,
                timeout: 4000,
                type: 'info'
            });
        });
        this.count += 1;
        this.sellsService.countSells(this.count, productId).subscribe(result => {
            console.log(result);
        });
    }

    checkOut(price, id) {
        this.navCtl.navigate('checkout', {price, id});
    }
}
