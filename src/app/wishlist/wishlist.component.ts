import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import {Route, Router} from '@angular/router';
import {WishlistModel} from '../models/wishlist.model';
import {ProductModel} from '../models/product.model';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
    url = `http://localhost:4000`;
    wishlists: Array<WishlistModel> = [];
    wishlist: WishlistModel;
    product: ProductModel;
    products: Array<ProductModel> = [];
    wishProducts = [];
    think: Array<ProductModel> = [];
    showProduct: ProductModel;
    constructor(
      private productService: ProductService,
      private router: Router,
      private userService: UserService,
      private flashMessage: NgFlashMessageService
  ) { }

  ngOnInit() {
      this.productService.getWishlists().subscribe((data: WishlistModel[]) => {
          for (const oneData of data) {
              this.wishlist  = new WishlistModel(oneData._id, oneData.item, oneData.owner);
              this.wishlists.push(this.wishlist);
              this.wishProducts.push(this.wishlist.item);
          }
          for ( const i of this.wishProducts) {
              this.product = i;
              const image = `${this.url}/${this.product.productImage}`;
              this.showProduct = new ProductModel(this.product._id, this.product.name, this.product.price, image );
              this.think.push(this.showProduct);
          }

      });
  }

}
