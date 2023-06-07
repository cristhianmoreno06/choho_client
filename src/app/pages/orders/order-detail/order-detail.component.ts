import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  public submitOrderForm: FormGroup;
  public title: any;
  public isEditable = false;
  public order: any;
  private order_id: any;

  constructor(public _orderService: OrderService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.order_id = this.route.snapshot.paramMap.get('order_id');
    if (this.order_id) {
      this.isEditable = true;
      this.title = 'Edición de pedido';
      this.createForms();
      this.getOrder(this.order_id);
    } else {
      this.title = 'Registro de pedido';
      this.createForms();
    }
  }

  public createForms() {
    this.generateOrderForm();
  }

  public getOrder(order_id) {
    const data = {
      order_id: order_id
    };
    this._orderService.getOrder(data).subscribe((response: any) => {
      this.order = response.ordersDetail;
      this.fillForms();
    }, error => {
      Swal.fire({
        title: error.error.title,
        html: error.error.detail,
        icon: 'error',
      });
    });
  }

  public fillForms() {
    this.submitOrderForm.get('id').setValue(this.order.id);
    this.submitOrderForm.get('nit').setValue(this.order.nit);
    this.submitOrderForm.get('razon_social').setValue(this.order.razon_social);
    this.submitOrderForm.get('num_pedido').setValue(this.order.num_pedido);
    this.submitOrderForm.get('department').setValue(this.order.city.id_departamento);
    this.submitOrderForm.get('city').setValue(this.order.city.id);
    this.submitOrderForm.get('prefijo').setValue(this.order.prefijo);
    this.submitOrderForm.get('vendedor').setValue(this.order.vendedor);
    const datepipe: DatePipe = new DatePipe('en-US');
    const formattedDate = datepipe.transform(this.order.fecha_pedido, 'yyyy-MM-dd');
    this.submitOrderForm.get('fecha_pedido').setValue(formattedDate);
  }

  public generateOrderForm(): void {

    this.submitOrderForm = new FormGroup({
      id: new FormControl(''),
      nit: new FormControl('', Validators.compose([Validators.required])),
      razon_social: new FormControl('', Validators.compose([Validators.required])),
      num_pedido: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      city: new FormControl('', Validators.compose([Validators.required])),
      prefijo: new FormControl('', Validators.compose([Validators.required])),
      vendedor: new FormControl('', Validators.compose([Validators.required])),
      fecha_pedido: new FormControl(''),
    });
  }

  public createOrUpdateOrder() {
    if (this.submitOrderForm.valid) {
      this._orderService.createOrUpdateOrder(this.submitOrderForm.value).subscribe((response: any) => {
        Swal.fire({
          title: response.title,
          text: response.text,
          icon: 'success',
        });
      }, error => {
        Swal.fire({
          title: error.error.title,
          text: error.error.text,
          icon: 'error',
        });
      });
    } else {
      // validate all form fields
      Object.keys(this.submitOrderForm.controls).forEach(field => {
        const control = this.submitOrderForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
    }
  }
}
