import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import Swal from 'sweetalert2';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
import {count} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public salesChart;
  public ordersChart;
  public clicked = true;
  public clicked1 = false;

  public currentMonthOrdersCount = 0;
  public currentMonthOrdersPercentage = 0;
  public currentMonthOrdersIcon = 'fa-arrow-down';
  public currentMonthOrdersIconColor = 'text-danger';
  public currentMonthProductsCount = 0;
  public currentMonthProductsPercentage = 0;
  public currentMonthProductsIcon = 'fa-arrow-up';
  public currentMonthProductsIconColor = 'text-success';
  public currentMonthSalesCount = 0;
  public currentMonthSalesPercentage = 0;
  public currentMonthSalesIcon = 'fa-arrow-down';
  public currentMonthSalesIconColor = 'text-danger';

  constructor(public _dashboardService: DashboardService) {

  }

  ngOnInit() {

    this.getInfoCards();


    /*this.datasets = [
      [100, 20, 10, 30, 15, 40, 20, 60, 60]
    ];*/
    // this.data = this.datasets[0];


    // tslint:disable-next-line:prefer-const
    const chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    this.ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    // tslint:disable-next-line:prefer-const
    const chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });

    this.getInfoOrderChart();
    this.getInfoSalesChart();
  }

  public getInfoCards(): void {

    this._dashboardService.getInfoCards().subscribe((response: any) => {
      console.log(response.ordersDetail);
      this.currentMonthOrdersCount = response.ordersDetail.length;
      this.currentMonthOrdersPercentage = response.ordersDetail.length * 100 / 10;
      this.currentMonthOrdersIcon = response.detail.currentMonthOrdersIcon;
      this.currentMonthOrdersIconColor =  response.detail.currentMonthOrdersIconColor;
    }, error => {
      Swal.fire({
        title: error.error.title,
        html: error.error.detail,
        icon: 'error',
      });
    });
  }

  public getInfoSalesChart(): void {

    this._dashboardService.getInfoSalesChart().subscribe((response: any) => {
      console.log(response.products);
      this.currentMonthProductsCount = response.products.length;
      this.currentMonthProductsPercentage = response.products.length * 100 / 1000;
      this.currentMonthProductsIcon = response.products.currentMonthProductsIcon;
      this.currentMonthProductsIconColor =  response.products.currentMonthProductsIconColor;
      this.salesChart.data.labels = response.detail.labels;
      this.salesChart.data.datasets[0].label = response.detail.label;
      this.salesChart.data.datasets[0].data = response.detail.data;
      this.salesChart.update();

    }, error => {
      Swal.fire({
        title: error.error.title,
        html: error.error.detail,
        icon: 'error',
      });
    });
  }

  public getInfoOrderChart(): void {

    this._dashboardService.getInfoOrderChart().subscribe((response: any) => {
      console.log(response.orders);
      this.currentMonthSalesCount = response.orders.length;
      this.currentMonthSalesPercentage = response.orders.length * 100 / 10;
      this.currentMonthSalesIcon = response.orders.currentMonthSalesIcon;
      this.currentMonthSalesIconColor =  response.orders.currentMonthSalesIconColor;
      this.ordersChart.data.labels = response.detail.labels;
      this.ordersChart.data.datasets[0].label = response.detail.label;
      this.ordersChart.data.datasets[0].data = response.detail.data;
      this.ordersChart.update();

    }, error => {
      Swal.fire({
        title: error.error.title,
        html: error.error.detail,
        icon: 'error',
      });
    });
  }

}
