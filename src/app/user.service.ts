import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    uri = 'http://localhost:4000';
    private token: any;
    username: String;
    password: String;

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

  authenticateUser(username, password){
      const user = {
          username,
          password
      };
      return this.http.post(`${this.uri}/user/login`, user, { responseType: 'json' });
  }

   logout() {
      this.token = '';
      window.localStorage.removeItem('user-token');
      this.router.navigateByUrl('/home');
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
    

}
