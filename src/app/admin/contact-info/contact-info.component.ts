import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import {ContactModel} from '../../models/contact.model';
import {DeleteModel} from '../../models/delete.model';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
    contactInfo = [];
    count = 1;
  constructor(private contactService: ContactService,
              private flashMessage: NgFlashMessageService) {
      this.contactService.getAllContactInfos().subscribe((result: ContactModel[]) => {
          for (const data  of result) {
              this.contactInfo.push({id: data._id, name: data.name, email: data.email, subject: data.subject, message: data.message});
          }
      });
  }

  ngOnInit() {
  }

    deleteContact(_id: any) {
        this.contactService.deleteContact(_id).subscribe((result: DeleteModel) => {
            this.flashMessage.showFlashMessage({
                messages: [result.message],
                dismissible: true,
                timeout: 4000,
                type: 'danger'
            });
        });
    }
}
