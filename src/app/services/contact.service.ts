import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
    url = 'http://localhost:4000';
  constructor(private http: HttpClient) { }
  getAllContactInfos() {
      return this.http.get(`${this.url}/contact`, { responseType: 'json'});
  }

  sendContact(name, email, subject, message) {
      const payload = {
          name,
          email,
          subject,
          message
      };
      return this.http.post(`${this.url}/contact`, payload, { responseType: 'json'});
  }

  deleteContact(id) {
      return this.http.delete(`${this.url}/contact/${id}`, {responseType: 'json'});
  }
}
