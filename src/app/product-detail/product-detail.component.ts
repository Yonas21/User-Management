import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { CommentService } from '../services/comment.service';
import {CommentModel} from '../models/comment.model';
import * as jwt_decode from 'jwt-decode';
import {ReviewModel} from '../models/review.model';
import {ReviewResponseModel} from '../models/reviewResponse.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    products: ProductModel[];
    image: string;
    count = 0;
    sum = 0;
    overall = 0;
    url = 'http://localhost:4000';
    comments: Array<CommentModel> = [];
    reviews: Array<ReviewModel> = [];
    rates = [];
    token = [];
    decodedToken: Array<ReviewResponseModel> = [];
    username = [];
  constructor(
      private productService: ProductService,
      private commentService: CommentService
      ) {
      this.productService.getProducts().subscribe((result: ProductModel[]) => {
         for (const data of result) {
             console.log(data);
         }
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

  getAllProducts() {
      this.productService.getProducts().subscribe((data: ProductModel[]) => {
         this.products = data;
         console.log('data requested');
         for (let i = 0; i < this.products.length ; i++) {
              this.image = `http://localhost:4000/${this.products[16].productImage}`;
              console.log(this.image);
              console.log(this.products.length);
          }

         console.log(this.products);
      });
  }
  addToCart() {
      console.log(`add to cart`);
  }
}
