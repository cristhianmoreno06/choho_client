import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public urlGetInfoCards: string;
  public urlGetInfoSalesChart: string;
  public urlGetInfoOrderChart: string;

  constructor(private httpClient: HttpClient) {
    this.urlGetInfoCards = environment.ApiEndPoint + 'orders/list';
    this.urlGetInfoSalesChart = environment.ApiEndPoint + 'orders/products';
    this.urlGetInfoOrderChart = environment.ApiEndPoint + 'orders/list';
  }

  public getInfoCards() {
    return this.httpClient.get(this.urlGetInfoCards);
  }

  public getInfoSalesChart() {
    return this.httpClient.get(this.urlGetInfoSalesChart);
  }

  public getInfoOrderChart() {
    return this.httpClient.get(this.urlGetInfoOrderChart);
  }
}
