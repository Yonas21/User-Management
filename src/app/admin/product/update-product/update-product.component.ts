import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { DeleteModel } from '../../../models/delete.model';
import { NgFlashMessageService} from 'ng-flash-messages';

const URL = 'http://localhost:4000/products';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

    productForm = new FormGroup({
        name: new FormControl(''),
        price: new FormControl('')
    });
    files = null;
    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private flashMessage: NgFlashMessageService
    ) {
        this.productForm = this.formBuilder.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            productImage: ['', Validators.required]
        });
    }
    ngOnInit() {
        this.productForm = this.formBuilder.group({
            name: [''],
            price: [''],
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
        formData.append('name', this.productForm.get('name').value);
        formData.append('price', this.productForm.get('price').value)
        formData.append('productImage', this.productForm.get('productImage').value);
        this.http.patch(`${URL}/:${id}`, formData, { responseType: 'json'}).subscribe((result: DeleteModel) => {
            this.flashMessage.showFlashMessage({
                messages: [result.message],
                dismissible: true,
                timeout: 4000,
                type: 'info'
            });
        });
    }
}
