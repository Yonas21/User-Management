import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {ProductModel} from '../models/product.model';

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
     color = 'all';
  constructor(private productService: ProductService) {
      this.productService.getProducts().subscribe((products: ProductModel[]) => {
          for (const productDetail of products) {
              const image = `${this.url}/${productDetail.productImage}`;
              // @ts-ignore
              this.ProductArray.push({name: productDetail.name, price: productDetail.price, color: productDetail.color, img: image});
          }
      });
  }

  ngOnInit() {
  }

  categorizeProduct(event) {
      const value = event.target.value;
      this.smallestRange = value;
  }

    SelectedOption(event) {
      this.color = event.target.value;
      console.log('color is :' + this.color);
    }
}
