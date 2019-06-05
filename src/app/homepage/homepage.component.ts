import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ProductService} from '../services/product.service';
import {ProductModel} from '../models/product.model';
import {UserModel} from '../models/user.model';

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
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.productService.getProducts().subscribe((data: ProductModel[]) => {
            for (const oneData of data) {
                const image = `${this.url}/${oneData.productImage}`;
                this.product  = new ProductModel(oneData._id, oneData.name, oneData.price, image);
                this.products.push(this.product);
                this.productService.id = this.product._id;
            }
        });
        this.userService.getUsers().subscribe((result: UserModel[]) => {
            for (const res of result) {
                this.user = new UserModel(res._id, res.email, res.password, res.role);
                this.users.push(this.user);
            }
        });
    }

    addWishlist() {
        this.productService.addToWishlist(this.product._id).subscribe(data => {
            if (!data) {
                this.flashMessage.showFlashMessage({
                    messages: ['unable to add to the wishlist.'],
                    dismissible: true,
                    timeout: 5000,
                    type: 'danger'
                });
                console.log(this.productService.productId);
            } else {
                this.productService.count = this.productService.count + 1;
                this.flashMessage.showFlashMessage({
                    messages: ['product added to wishlist'],
                    dismissible: true,
                    timeout: 5000,
                    type: 'success'
                });
            }
        });
    }

    addToCart() {
        this.productService.addToCart(this.product._id).subscribe(result => {
            if (!result) {
                this.flashMessage.showFlashMessage({
                    messages: ['unable to add to cart'],
                    dismissible: true,
                    timeout: 4000,
                    type: 'danger'
                });
            } else {
                this.productService.count += 1;
                this.flashMessage.showFlashMessage({
                    messages: ['product added to cart'],
                    dismissible: true,
                    timeout: 5000,
                    type: 'success'
                });
            }
        });
    }

}
