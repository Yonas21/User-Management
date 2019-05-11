import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ProductService} from '../services/product.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    constructor(
        private userService: UserService,
        private router: Router,
        private flashMessage: NgFlashMessageService,
        private productService: ProductService
    ) {}

    ngOnInit() {}



    getAllProducts() {
        const arr = [];
        this.productService.getProducts().subscribe(data => {
           for (const message in data) {
               if (data.hasOwnProperty(message)) {
                   arr.push(data[message]);
                   console.log(arr[1]);
               }
           }
        });
    }

}
