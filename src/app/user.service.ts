import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    uri = 'http://localhost:4000';
    private token: any;
    private user: any;

  constructor(private http: HttpClient, private router: Router) { }

  addUser(firstName, lastName, password, birthday, gender, email, phoneNo, address) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'Application/json');
      const user = {
       firstName,
       lastName,
       password,
       birthday,
       gender,
       email,
       phoneNo,
       address
   };

      return this.http.post(`${this.uri}/user/signup`, user,{responseType:'json'});
  }

  saveToken(token) {
      localStorage.setItem('user-token', token);
      this.token = token;
  }

  getToken() {
      if (!this.token) {
          this.token = localStorage.getItem('user-token');
      }

      return this.token;
  }

   logout() {
      this.token = '';
      window.localStorage.removeItem('user-token');
      this.router.navigateByUrl('/home');
  }





}
