import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {ProductModel} from '../models/product.model';
import {DeleteModel} from '../models/delete.model';
import {UserModel} from '../models/user.model';
import {NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
    ProductArray = [];
    singleProduct: ProductModel;
    url = 'http://localhost:4000';
    smallestRange = 0;
    color = 'white';
    products: Array<ProductModel> = [];
    users: Array<UserModel> = [];
    count = 0;
    product: ProductModel;
    user: UserModel;
  constructor(private productService: ProductService, private flashMessage: NgFlashMessageService, private router: Router) {
      this.productService.getProducts().subscribe((products: ProductModel[]) => {
          // console.log(`this color: ${this.color}`);
          for (const productDetail of products) {
              const image = `${this.url}/${productDetail.productImage}`;
              // @ts-ignore
              this.ProductArray.push({name: productDetail.name, price: productDetail.price, color: productDetail.color, img: image});
          }
      });
  }

  ngOnInit() {
      console.log(`this color: ${this.color}`);
  }

  categorizeProduct(event) {
      const value = event.target.value;
      this.smallestRange = value;
  }

    SelectedOption(event) {
      this.color = event.target.value;
      console.log(this.color);
    }
    checkOut() {
        this.productService.getOneProduct(this.product._id).subscribe((productDetail: ProductModel) => {
            this.productService.detailForPayment.push(this.product);
            this.router.navigate(['/payment']);
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
}

