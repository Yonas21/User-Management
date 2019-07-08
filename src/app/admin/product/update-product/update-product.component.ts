import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { DeleteModel } from '../../../models/delete.model';
import { NgFlashMessageService} from 'ng-flash-messages';
import { ProductService } from '../../../services/product.service';
import {ProductModel} from '../../../models/product.model';

const URL = 'http://localhost:4000/';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

    productForm = new FormGroup({
        newName: new FormControl(''),
        newPrice: new FormControl('')
    });
    singleProduct: Array<ProductModel> = [];
    product: ProductModel;
    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private flashMessage: NgFlashMessageService,
        private productService: ProductService
    ) {
        const id = window.location.pathname.substr(22, 24);
        this.productService.getOneProduct(id).subscribe((oneProduct: ProductModel) => {
            const image = `${URL}/${oneProduct.productImage}`;
            this.product  = new ProductModel(oneProduct._id, oneProduct.name, oneProduct.price, oneProduct.color, image);
            this.singleProduct.push(this.product);
        });
    }
    ngOnInit() {
        this.productForm = this.formBuilder.group({
            newName: ['', Validators.required],
            newPrice: ['', Validators.required],
            productImage: ['']
        });
    }
    onChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.productForm.get('productImage').setValue(file);
        }
    }

    onSubmit() {
        const id = window.location.pathname.substr(22, 24);
        const formData = new FormData();
        formData.append('newName', this.productForm.get('newName').value);
        formData.append('newPrice', this.productForm.get('newPrice').value)
        formData.append('productImage', this.productForm.get('productImage').value);
        this.http.patch(`${URL}/${id}`, formData, { responseType: 'json'}).subscribe((result: DeleteModel) => {
            this.flashMessage.showFlashMessage({
                messages: [result.message],
                dismissible: true,
                timeout: 4000,
                type: 'info'
            });
        });
    }
}
