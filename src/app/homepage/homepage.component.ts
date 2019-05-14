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
    products: ProductModel[];
    image: string;
    url = 'http://localhost:4000';

    constructor(
        private userService: UserService,
        private router: Router,
        private flashMessage: NgFlashMessageService,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.productService.getProducts().subscribe((data: ProductModel[]) => {
            this.products = data;
            console.log('data requested');
            for (let i = 0; i < this.products.length ; i++) {
                this.image = `${this.url}/${this.products[i].productImage}`;
            }

            console.log(this.image);
        });
    }



    getAllProducts() {
        this.productService.getProducts().subscribe((data: ProductModel[]) => {
            this.products = data;
            console.log('data requested');
            for (let i = 0; i < this.products.length ; i++) {
                this.image = `${this.url}/${this.products[i].productImage}`;
            }

            console.log(this.image);
        });
    }

}
