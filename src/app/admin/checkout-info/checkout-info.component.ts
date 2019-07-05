import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CheckoutInfoModel } from '../../models/checkout-info.model';
import {ProductModel} from '../../models/product.model';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-checkout-info',
  templateUrl: './checkout-info.component.html',
  styleUrls: ['./checkout-info.component.css']
})
export class CheckoutInfoComponent implements OnInit {
    checkoutInfoArray = [];
  constructor(private productService: ProductService, private userService: UserService) {
      this.productService.getcheckoutInfo().subscribe((result: CheckoutInfoModel[]) => {
          for (const data of result) {
              this.productService.getOneProduct(data.productInfo).subscribe((oneProduct: ProductModel) => {
                  console.log(oneProduct);
                  this.checkoutInfoArray.push({productName: oneProduct.name});
              });
              this.userService.getAUser(data.userInfo).subscribe((oneUser: UserModel) => {
                  console.log(oneUser[0].firstName);
                  this.checkoutInfoArray.push(
                      {id: data._id},
                      {firstName: oneUser[0].firstName},
                      {email: oneUser[0].email},
                      {phone: oneUser[0].phoneNo});
              });
          }
      });
  }

  ngOnInit() {
  }

    deleteContact(id: any) {
      console.log(id);
    }
}
