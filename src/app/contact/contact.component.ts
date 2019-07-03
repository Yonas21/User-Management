import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { NgFlashMessageService} from 'ng-flash-messages';
import {DeleteModel} from '../models/delete.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService, private flashMessage: NgFlashMessageService) { }

  ngOnInit() {
  }

  sendContact(name, email, subject, message) {
      this.contactService.sendContact(name, email, subject, message).subscribe((result: DeleteModel) => {
          console.log(result);
          this.flashMessage.showFlashMessage({
              messages: [result.message],
              dismissible: true,
               timeout: 4000,
              type: 'success'
          });
      });
  }
}
