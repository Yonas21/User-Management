import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import {Route, Router} from '@angular/router';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
    uri = `http://localhost:4000`;

  constructor(
      private productService: ProductService,
      private router: Router,
      private userService: UserService
  ) { }

  ngOnInit() {
  }

  getWishlists() {
      this.productService.getWishlists().subscribe(data => {
          console.log(data);
      });
  }

  getLog() {
      this.userService.logToken();
  }

}
