import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { CommentService } from '../services/comment.service';
import {CommentModel} from '../models/comment.model';
import * as jwt_decode from 'jwt-decode';
import {ReviewModel} from '../models/review.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    products: ProductModel[];
    image: string;
    url = 'http://localhost:4000';
    comments: Array<CommentModel> = [];
  constructor(
      private productService: ProductService,
      private commentService: CommentService
      ) {
      this.commentService.getComments().subscribe((result: CommentModel[]) => {
          for (const data of result) {
              this.comments.push(data);
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
  getAllComments() {
      this.commentService.getReviews().subscribe((result: ReviewModel[]) => {
          for (const data of result) {
              const token = data.token;
              try {
                  const decoded = jwt_decode(token);
                  console.log(decoded);
              } catch (e) {
                  console.error(e);
              }
          }
      });
  }
}
