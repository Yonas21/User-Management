import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { NgFlashMessageService} from 'ng-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:4000';
  productId = [];
  count = 0;
  constructor(
    private http: HttpClient,
    private router: Router,
    private flashMessage: NgFlashMessageService
    ) { }

    getProducts() {
      return this.http.get(`${this.url}/products`, { responseType: 'json' });
    }

    addWishlist(name, price, productImage) {
        const products = {
            name,
            price,
            productImage
        };
        return this.http.post(`${this.url}/wish_lists`, products, {responseType: 'json'});
    }

    getWishlists() {
      return this.http.get(`${this.url}/wish_lists`, {responseType: 'json'});
    }
}
