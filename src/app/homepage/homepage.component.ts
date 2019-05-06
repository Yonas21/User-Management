import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";

@Component({
    selector: "app-homepage",
    templateUrl: "./homepage.component.html",
    styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
    constructor(
        private userService: UserService,
        private router: Router,
        private flashMessage: NgFlashMessageService
    ) {}

    ngOnInit() {}

    onLogoutClick() {
        this.userService.logout();
        this.flashMessage.showFlashMessage({
          messages: ['You Logged out Successfully.'],
          dismissible: true,
          timeout: 5000,
          type: 'info'
        })
    }
}
