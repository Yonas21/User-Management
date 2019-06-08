import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, Form} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ShopService } from '../../../services/shop.service';
import { ShopModel } from '../../../models/shop.model';
import { MallService } from '../../../services/mall.service';

@Component({
  selector: 'app-add-mall',
  templateUrl: './add-mall.component.html',
  styleUrls: ['./add-mall.component.css']
})
export class AddMallComponent implements OnInit {
    shops = [];
    data: any = {};
    mallForm: FormGroup;
  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private shopService: ShopService,
      private mallService: MallService
      ) {
      this.shopService.getShops().subscribe((result: ShopModel[] ) => {
          for (const data of result) {
              this.shops.push({name: data.name, value: data._id});
          }
      });
      this.createForm();
  }

  ngOnInit() {
  }
  addMall(name: string, address: string, contact: string, item: string, closing: string) {
        this.mallService.addMall(name, address, contact, item, closing).subscribe(result => {
            console.log(result);
        });
    }

    createForm() {
      this.mallForm = this.formBuilder.group({
          name : new FormControl('', Validators.required),
          address: new FormControl('', Validators.required),
          contact: new FormControl('', Validators.required),
          closing: new FormControl('', Validators.required)
      });
    }
}
