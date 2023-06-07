import {Component, OnInit} from '@angular/core';
import {OrderService} from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  public orders: any;

  constructor(public _orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  public getOrders() {
    this._orderService.getOrders().subscribe((response: any) => {
      this.orders = response.orders;
    }, error => {
      Swal.fire({
        title: error.error.title,
        html: error.error.detail,
        icon: 'error',
      });
    });
  }

  public deleteOrder(order_id, index) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este pedido?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      icon: 'question',
    }).then((result) => {
      if (!result.dismiss) {
        const data = {
          order_id: order_id
        };
        this._orderService.deleteOrder(data).subscribe((response: any) => {
          this.getOrders();
          Swal.fire({
            title: response.title,
            text: response.text,
            icon: 'success'
          });

        }, error => {
          Swal.fire({
            title: error.error.title,
            text: error.error.text,
            icon: 'error'
          });
        });
      }
    });
  }
}
