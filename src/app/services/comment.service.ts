import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
const URL = 'http://localhost:4000/comment';
const reviewURL = 'http://localhost:4000/review';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
      private http: HttpClient
  ) { }

  addComment(email, phone, message) {
      const commentPayload = {
          email, phone, message
      };
      return this.http.post(URL, commentPayload, {responseType: 'json'});
  }

  getComments() {
      return this.http.get(URL, { responseType: 'json'});
  }

  getReviews() {
      return this.http.get(reviewURL, { responseType: 'json'});
  }
}
