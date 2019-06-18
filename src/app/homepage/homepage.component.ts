import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ProductService} from '../services/product.service';
import {ProductModel} from '../models/product.model';
import {UserModel} from '../models/user.model';
import {DeleteModel} from '../models/delete.model';
import {WishlistModel} from '../models/wishlist.model';
import {CartModel} from '../models/cart.model';

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
    carts = 0;
    wishlists = 0;
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
                this.product  = new ProductModel(oneData._id, oneData.name, oneData.price, oneData.color, image);
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
        this.productService.addToWishlist(this.product._id).subscribe((data: DeleteModel) => {
            this.flashMessage.showFlashMessage({
                messages: [data.message],
                dismissible: true,
                timeout: 4000,
                type: 'info'
            });
        });
    }

    addToCart() {
        this.productService.addToCart(this.product._id).subscribe((result: DeleteModel) => {
            this.flashMessage.showFlashMessage({
                messages: [result.message],
                dismissible: true,
                timeout: 4000,
                type: 'info'
            });
        });
    }

    checkOut() {
        console.log(`item will be checked out`);
        this.router.navigate(['/payment']);
    }
}
