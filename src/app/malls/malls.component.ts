import { Component, OnInit } from '@angular/core';
import { MallService} from '../services/mall.service';
import { MallModel} from '../models/mall.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-malls',
  templateUrl: './malls.component.html',
  styleUrls: ['./malls.component.css']
})
export class MallsComponent implements OnInit {
     malls: Array<MallModel> = [];
  constructor(private mallService: MallService,
              private router: Router
              ) {
  }

  ngOnInit() {
      const id = window.location.pathname.substr(6, 30);
      this.mallService.getAMall(id).subscribe((result) => {
          console.log(result);
      });
  }


}
