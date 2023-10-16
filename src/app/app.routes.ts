import { Routes } from '@angular/router';
import { adminGuard } from '@core/guards/admin.guard';

import { AdminLayoutComponent } from '@admin/admin-layout.component';
import { AuthLayoutComponent } from '@auth/auth-layout.component';

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
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
  },
];
