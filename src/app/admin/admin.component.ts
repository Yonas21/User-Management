import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin',
    templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    validateForm: FormGroup;
    productMenu = {
        products : false,
    };
    mallMenu = {
        malls: false,
    };
    shopMenu = {
        shops: false
    }
    submitForm(): void {
        // @ts-ignore
        for (const i of this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true]
        });
    }

    hideAndShowProducts(section) {
        this.productMenu[section] = !this.productMenu[section];
    }
    hideAndShowMalls(section) {
        this.mallMenu[section] = !this.mallMenu[section];
    }

    hideAndShowShops(section) {
        this.shopMenu[section] = !this.shopMenu[section];
    }

}
