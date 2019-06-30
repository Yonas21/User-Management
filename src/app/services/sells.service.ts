import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellsService {
    url = 'http://localhost:4000';
  constructor(
      private http: HttpClient
  ) { }
  countSells(count, id) {
      const payload = {
          id
      };

      return this.http.post(`${this.url}/sells/${id}`, payload, {responseType: 'json'});
  }
  getHotDeals() {
      return this.http.get(`${this.url}/sells`, {responseType: 'json'});
  }
}
