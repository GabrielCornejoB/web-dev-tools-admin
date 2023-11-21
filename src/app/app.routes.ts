import { Routes } from '@angular/router';

import { publicGuard, authGuard, adminGuard } from '@core/guards';
import { AdminLayoutComponent } from '@admin/admin-layout.component';
import { AuthLayoutComponent } from '@auth/auth-layout.component';
import { HomeLayoutComponent } from '@home/home-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('@auth/auth.routes').then((r) => r.routes),
    canActivate: [publicGuard],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'home',
    component: HomeLayoutComponent,
    canActivate: [authGuard],
  },
];
