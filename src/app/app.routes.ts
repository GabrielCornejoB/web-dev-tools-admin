import { Routes } from '@angular/router';

import { authGuard } from '@core/guards/auth.guard';
import { publicGuard } from '@core/guards/public.guard';
import { AdminLayoutComponent } from '@admin/admin-layout.component';
import { AuthLayoutComponent } from '@auth/auth-layout.component';
import { HomeLayoutComponent } from './features/home/home-layout.component';
import { adminGuard } from '@core/guards/admin.guard';

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
