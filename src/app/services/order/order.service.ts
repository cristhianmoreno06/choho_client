import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public urlGetOrders: string;
  public urlGetOrder: string;
  public urlDeleteOrder: string;
  public urlCreateOrUpdateOrder: string;

  constructor(private httpClient: HttpClient) {
    this.urlGetOrders = environment.ApiEndPoint + 'orders/list';
    this.urlGetOrder = environment.ApiEndPoint + 'orders/detail';
    this.urlDeleteOrder = environment.ApiEndPoint + 'orders/delete';
    this.urlCreateOrUpdateOrder = environment.ApiEndPoint + 'orders/createOrUpdate';
  }

  public getOrders() {
    return this.httpClient.get(this.urlGetOrders);
  }

  public getOrder(data: any) {
    return this.httpClient.post(this.urlGetOrder, data, { responseType: 'json' });
  }

  public deleteOrder(data: any) {
    return this.httpClient.post(this.urlDeleteOrder, data, { responseType: 'json' });
  }

  public createOrUpdateOrder(data: any) {
    return this.httpClient.post(this.urlCreateOrUpdateOrder, data, { responseType: 'json' });
  }
}
