import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/gestion_de_usuarios', title: 'Gestion de terceros',  icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/gestion_de_pedidos', title: 'Gestion de pedidos',  icon: 'ni-box-2 text-orange', class: '' },
];

export const ROUTES_2: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/gestion_de_usuarios', title: 'Gestion de terceros',  icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/gestion_de_pedidos', title: 'Gestion de pedidos',  icon: 'ni-box-2 text-orange', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public userName: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userName = localStorage.getItem('name-user');
    const userRol = localStorage.getItem('rol-user');
    // tslint:disable-next-line:triple-equals
    if (userRol == '1') {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    } else {
      this.menuItems = ROUTES_2.filter(menuItem => menuItem);
    }

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
