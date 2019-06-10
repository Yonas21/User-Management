import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
    url = 'http://localhost:4000/shop';
    id: string;
  constructor(
      private http: HttpClient
  ) { }
  getShops() {
      return this.http.get(this.url, {responseType: 'json'});
  }

  addShops(name, item, contactNo) {
      const shop = {
          name,
          item,
          contactNo
      };
      return this.http.post(this.url, shop, {responseType: 'json'});
  }

  deleteShop(shop) {
      return this.http.delete(`${this.url}/${shop}`, {responseType: 'json'});
  }
  getAShop(id) {
      return this.http.get(`${this.url}/${id}`, {responseType: 'json'});
  }
}
