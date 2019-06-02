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
}
