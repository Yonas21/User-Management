import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  path: string;

  constructor(private userService: UserService , private router: Router) {
      if (window.location.pathname === '/admin'){
          this.path = '/admin';
      } else {
          this.path = 'other';
      }
  }
}
