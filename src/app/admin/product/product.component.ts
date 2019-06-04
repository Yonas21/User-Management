import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';
import { NgFlashMessageService } from 'ng-flash-messages';
import { DeleteModel } from '../../models/delete.model';
import { Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    products: Array<ProductModel> = [];
    product: ProductModel;
    message: string;
    constructor(
        private productService: ProductService,
        private flashMessage: NgFlashMessageService,
        private router: Router
        ) {
      this.productService.getProducts().subscribe((result: ProductModel[]) => {
         for (const data of result) {
             this.products.push(data);
             this.product = new ProductModel(data._id, data.name, data.price, data.productImage);
             this.productService.id = this.product._id;
         }
      });
  }

  ngOnInit() {
  }

  updateProduct(id) {
        this.router.navigate([`/admin/update-product/${id}`]);
  }
  deleteProducts() {
        this.productService.deleteProduct(this.product._id).subscribe((result: DeleteModel) => {
            if (result.message) {
                this.flashMessage.showFlashMessage({
                    messages: [result.message],
                    dismissible: true,
                    timeout: 4000,
                    type: 'success'
                });
            }
        });
  }
}
