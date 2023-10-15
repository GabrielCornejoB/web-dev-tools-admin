import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.routes').then((r) => r.routes),
  },
];
