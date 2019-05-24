import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { NgFlashMessageService} from 'ng-flash-messages';
import {ProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:4000';
  productId = [];
  count = 0;
  id: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private flashMessage: NgFlashMessageService
    ) { }

    getProducts() {
      return this.http.get(`${this.url}/products`, { responseType: 'json' });
    }

    addToWishlist(item) {
        const products = {
            item
        };
        return this.http.post(`${this.url}/wish_lists/${this.id}`, products, {responseType: 'json'});

    }

    addToCart(item) {
      const product = {
          item
      };
      return this.http.post(`${this.url}/wish_lists/${this.id}`, product, { responseType: 'json'});
    }
    getWishlists() {
      return this.http.get(`${this.url}/wish_lists`, {responseType: 'json'});
    }
}
