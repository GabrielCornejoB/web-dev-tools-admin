import { Routes } from '@angular/router';

import { publicGuard, authGuard } from '@core/guards';
import { AuthLayoutComponent } from '@auth/auth-layout.component';
import { LayoutComponent } from '@shared/components';

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
    path: 'home',
    component: LayoutComponent,
    loadChildren: () =>
      import('@dashboard/dashboard.routes').then((r) => r.routes),
    canActivate: [authGuard],
  },
];
