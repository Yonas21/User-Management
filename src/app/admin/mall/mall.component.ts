import { Component, OnInit } from '@angular/core';
import { MallService } from '../../services/mall.service';
import { MallModel } from '../../models/mall.model';
import { DeleteModel } from '../../models/delete.model';
import { NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-mall',
  templateUrl: './mall.component.html',
  styleUrls: ['./mall.component.css']
})
export class MallComponent implements OnInit {
    mall: MallModel;
    malls: Array<MallModel> = [];
  constructor(
      private mallService: MallService,
      private flashMessage: NgFlashMessageService,
      private router: Router
  ) {
      this.mallService.getMalls().subscribe((result: MallModel[]) => {
          for (const data of result) {
              this.mall = new MallModel(data.closing_hour, data._id, data.name, data.shop, data.address, data.contactNo);
              this.malls.push(this.mall);
              this.mallService.id = this.mall._id;
          }
      });

  }

  ngOnInit() {
  }
  deleteMalls() {
      this.mallService.DeleteMalls(this.mall._id).subscribe((result: DeleteModel) => {
          if (result.message) {
              this.flashMessage.showFlashMessage({
                  messages: [result.message],
                  dismissible: true,
                  timeout: 4000,
                  type: 'info'
              });
          }
      });
  }

    updateMall(id) {
        this.router.navigate([`/admin/update-mall/${id}`]);
    }
}
