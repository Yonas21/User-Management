import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:4000';
  productId = [];
  count = 0;
  id: string;
  detailForPayment: Array<ProductModel> = [];
  constructor(
    private http: HttpClient
    ) { }

    addProduct(name, price, path) {
      const product = {
          name,
          price,
          path
      };
      return this.http.post(`${this.url}/products`, product, { responseType: 'json' });
      // console.log(product);

    }
    getProducts() {
      return this.http.get(`${this.url}/products`, { responseType: 'json' });
    }

    addToWishlist(item) {
        const products = {
            item
        };
        return this.http.post(`${this.url}/wish_lists/${item}`, products, {responseType: 'json'});

    }

    addToCart(item) {
      const product = {
          item
      };
      return this.http.post(`${this.url}/carts/${item}`, product, { responseType: 'json'});
    }
    getWishlists() {
      return this.http.get(`${this.url}/wish_lists`, {responseType: 'json'});
    }
    deleteProduct(item) {
      return this.http.delete(`${this.url}/products/${item}`, { responseType: 'json' });
    }
    getOneProduct(item) {
      return this.http.get(`${this.url}/products/${item}`, {responseType: 'json'});
    }
    getProductFromCart() {
      return this.http.get(`${this.url}/carts`, {responseType: 'json'});
    }
}
