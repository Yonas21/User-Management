import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ShopModel} from '../../models/shop.model';
import {Router} from '@angular/router';
import { ProductService } from '../../services/product.service';
import {ProductModel} from '../../models/product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
    shops = [];
    shop: ShopModel;
  constructor(
      private shopService: ShopService,
      private router: Router,
      private productService: ProductService
  ) {
      this.shopService.getShops().subscribe((result: ShopModel[]) => {
          for (const data of result) {
              this.shopService.id = data._id;
              this.productService.getOneProduct(data.item).subscribe((products: ProductModel) => {
                  this.shops.push({name: data.name, item: products.name, contactNo: data.contactNo, _id: data._id});
              });

          }
      });
  }

  ngOnInit() {
  }

  updateShop(id) {
      console.log(id);
      this.router.navigate([`/admin/update-shop/${id}`]);
  }
  deleteShop(id) {
    this.shopService.deleteShop(id).subscribe(result => {
        console.log(result);
    });
    }
}
