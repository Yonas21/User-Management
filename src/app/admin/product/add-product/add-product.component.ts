import { Component, OnInit } from '@angular/core';
import {FormsModule, FormBuilder, FormGroup, Validators, Form} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import {FileUploader, FileSelectDirective} from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    productForm: FormGroup;
    imageUrl: 'http://localhost:4000/uploads';
    // @ts-ignore
    public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  constructor(
      private formBuilder: FormBuilder,
      private productService: ProductService
  ) {
      this.productForm = this.formBuilder.group({
          userName: ['', Validators.required],
          password: ['', Validators.required]
      });
  }
    ngOnInit() {
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          console.log('File Uploaded: uploaded', item, status, response);
          alert('File upload succcessfully');
      };
    }

  addProduct(name, price, path) {
      this.productService.addProduct(name, price, path).subscribe(result => {
          console.log(result);
      });
      // this.productService.addProduct(name, price, path);
  }

}
