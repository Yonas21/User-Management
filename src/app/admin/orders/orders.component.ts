import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import {OrderModel} from '../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    OrderArray = [];
    url = 'http://localhost:4000';
  constructor(private orderService: OrderService) {
      this.orderService.getOrders().subscribe((orders: OrderModel[]) => {
          for (const order of orders) {
              const image = `${this.url}/${order.productImage}`;
              this.OrderArray.push({name: order.name, quantity: order.quantity, description: order.description, img: image });
          }
      });
  }

  ngOnInit() {
  }

}
