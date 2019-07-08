import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { CommentService } from '../services/comment.service';
import {CommentModel} from '../models/comment.model';
import * as jwt_decode from 'jwt-decode';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import {ReviewModel} from '../models/review.model';
import {ReviewResponseModel} from '../models/reviewResponse.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: Array<ProductModel> = [];
    image: string;
    count = 0;
    sum = 0;
    overall = 0;
    productDetails: ProductModel;
    url = 'http://localhost:4000';
    comments: Array<CommentModel> = [];
    reviews: Array<ReviewModel> = [];
    rates = [];
    token = [];
    decodedToken: Array<ReviewResponseModel> = [];
    username = [];
  constructor(
      private productService: ProductService,
      private commentService: CommentService,
      private navCtl: NgxNavigationWithDataComponent
      ) {
      const id = this.navCtl.get('productId');
      this.productService.getOneProduct(id).subscribe((singleProduct: ProductModel) => {
         const image = `${this.url}/${singleProduct.productImage}`;
         this.productDetails  = new ProductModel(singleProduct._id, singleProduct.name, singleProduct.price, singleProduct.color, image);
         this.product.push(this.productDetails);
      });
      this.commentService.getComments().subscribe((result: CommentModel[]) => {
          for (const data of result) {
              this.comments.push(data);
          }
      });
      this.commentService.getReviews().subscribe((result: ReviewModel[]) => {
          this.count = result.length;
          for (const data of result) {
              this.reviews.push(data);
              this.rates.push(+data.rate);
              this.token.push(data.token);
          }
          for (const rate of this.rates) {
              this.sum = this.sum + rate;
          }
          this.overall = this.sum / this.count;
          for (const token of this.token) {
              try {
                  const decoded = jwt_decode(token);
                  this.decodedToken.push(decoded);
              } catch (e) {
                  console.error(e);
              }
          }

          for (const individualDecode of this.decodedToken) {
              this.username.push(individualDecode.name);
          }
      });
  }

  ngOnInit() {
  }
  addToCart() {
      console.log(`add to cart`);
  }
}
