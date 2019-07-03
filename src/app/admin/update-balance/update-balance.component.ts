import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-balance',
  templateUrl: './update-balance.component.html',
  styleUrls: ['./update-balance.component.css']
})
export class UpdateBalanceComponent implements OnInit {
    updateBalanceForm = new FormGroup({
        username: new FormControl(''),
        balance: new FormControl(''),
    });

  constructor(private userService: UserService, private flashMessage: NgFlashMessageService, private fb: FormBuilder) { }

  ngOnInit() {
      this.updateBalanceForm = this.fb.group({
          username: new FormControl('', [
              Validators.required,
              Validators.email
          ]),
          balance: new FormControl('', [
              Validators.required
          ]),
      });
  }

  updateBalance(username, balance) {
      this.userService.updateBalance(username, balance).subscribe(result => {
          console.log(result);
          this.flashMessage.showFlashMessage({
              messages: ['balance update successfully'],
              dismissible: true,
              timeout: 4000,
              type: 'success'
          });
      });
  }

}
