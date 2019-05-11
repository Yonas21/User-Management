import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private flashMessage: NgFlashMessageService) { }

    onLogoutClick() {
        this.userService.logout();
        this.flashMessage.showFlashMessage({
            messages: ['You Logged out Successfully.'],
            dismissible: true,
            timeout: 5000,
            type: 'info'
        });
    }

  ngOnInit() {
  }

}
