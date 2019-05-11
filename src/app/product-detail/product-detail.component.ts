import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    products: ProductModel[];
    image: string;
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  getAllProducts() {
      this.productService.getProducts().subscribe((data: ProductModel[]) => {
         this.products = data;
         console.log('data requested');
         for (let i = 0; i < this.products.length ; i++) {
              this.image = this.products[i].productImage;
          }
      });
  }
}
