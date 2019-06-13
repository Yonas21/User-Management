import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MallService {
    url = 'http://localhost:4000';
    id: string;
  constructor(
      private http: HttpClient
  ) { }

  getMalls() {
      return this.http.get(`${this.url}/mall`, {responseType: 'json'});
  }

  DeleteMalls(item) {
      return this.http.delete(`${this.url}/mall/${item}`, { responseType: 'json'});
  }
    addMall(name: string, address: string, contact: string, item, closing: string) {
      const mall = {
          name,
          address,
          contact,
          item,
          closing
      };
      return this.http.post(`${this.url}/mall`, mall, { responseType: 'json'});
  }

    getAMall(item) {
        return this.http.get(`${this.url}/mall/${item}`, { responseType: 'json'});
    }
}
