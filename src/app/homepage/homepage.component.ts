import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ProductService} from '../services/product.service';
import {ProductModel} from '../models/product.model';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    products: Array<ProductModel> = [];
    url = 'http://localhost:4000';
    count = 0;
    product: ProductModel;

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
                this.product  = new ProductModel(oneData.name, oneData.price, image);
                this.products.push(this.product);
            }
            console.log(this.products);

        });
    }

    addWishlist() {
        this.productService.addWishlist(this.product.name, this.product.price, this.product.productImage).subscribe(data => {
            if (!data) {
                this.flashMessage.showFlashMessage({
                    messages: ['unable to add to the wishlist.'],
                    dismissible: true,
                    timeout: 5000,
                    type: 'danger'
                });
            } else {
                this.count = this.count + 1;
                this.flashMessage.showFlashMessage({
                    messages: ['product added to wishlist'],
                    dismissible: true,
                    timeout: 5000,
                    type: 'success'
                });
            }
        });
    }

}
