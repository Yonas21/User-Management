import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
const URL = 'http://localhost:4000/orders/';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private http: HttpClient) { }

  getOrders() {
      return this.http.get(URL, { responseType: 'json'});
  }
}
