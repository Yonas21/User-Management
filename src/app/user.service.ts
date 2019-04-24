import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    uri = 'http://localhost:4000';

  constructor(private http: HttpClient, private router: Router) { }

  addUser(firstName, lastName, password, birthday, gender, email, phoneNo, address) {
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

   return this.http.post(`${this.uri}/user/signup`, user);
  }


}
