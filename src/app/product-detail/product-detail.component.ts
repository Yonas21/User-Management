import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    products: ProductModel[];
    image: string;
    url = 'http://localhost:4000';
  constructor(private productService: ProductService) { }

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
}
