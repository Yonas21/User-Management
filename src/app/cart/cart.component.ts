import { Component, OnInit } from '@angular/core';
import { ProductService} from '../services/product.service';
import { ProductModel} from '../models/product.model';
import {CartModel} from '../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    Products: Array<ProductModel> = [];
    count = 1;
    url = 'http://localhost:4000';
    sum = 0;
  constructor(
      private productService: ProductService,
  ) {
      this.productService.getProductFromCart().subscribe((products: CartModel[]) => {
          for (const product of products) {
              // @ts-ignore
              this.Products.push({...product.item, productImage: `http://localhost:4000/${product.item.productImage}`});
              // @ts-ignore
              this.sum += product.item.price *  this.count;
          }
      });
  }

  ngOnInit() {
  }

    findValue(event) {
        const quantity = event.target.value;
        this.count = quantity;
        this.productService.getProductFromCart().subscribe((products: CartModel[]) => {
            for (const product of products) {
                // @ts-ignore
                this.sum += product.item.price *  this.count;
            }
        });

    }
}
