import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Form, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-mall',
  templateUrl: './add-mall.component.html',
  styleUrls: ['./add-mall.component.css']
})
export class AddMallComponent implements OnInit {

    mallForm = new FormGroup({
        name: new FormControl(''),
        price: new FormControl('')
    });
  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {

  }


}
