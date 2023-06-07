import {Routes} from '@angular/router';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {AuthGuard} from 'src/app/auth.guard';
import {UserListComponent} from '../../pages/users/user-list/user-list.component';
import {UserFormComponent} from '../../pages/users/user-form/user-form.component';
import {OrderListComponent} from '../../pages/orders/order-list/order-list.component';
import {OrderDetailComponent} from '../../pages/orders/order-detail/order-detail.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'user-profile', component: UserProfileComponent},
      {path: 'tables', component: TablesComponent},
      {path: 'icons', component: IconsComponent},
      {path: 'maps', component: MapsComponent},
      {
        path: 'gestion_de_usuarios',
        children: [
          {
            path: '',
            component: UserListComponent
          },
          {
            path: 'registrar_usuario',
            component: UserFormComponent
          },
          {
            path: 'editar_usuario/:user_id',
            component: UserFormComponent
          }
        ]
      },
      {
        path: 'gestion_de_pedidos',
        children: [
          {
            path: '',
            component: OrderListComponent
          },
          {
            path: 'registrar_pedido',
            component: OrderDetailComponent
          },
          {
            path: 'editar_pedido/:order_id',
            component: OrderDetailComponent
          }
        ]
      },
    ]
  }
];
