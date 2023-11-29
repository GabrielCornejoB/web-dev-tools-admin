import { Routes } from '@angular/router';
import { ToolsPageComponent } from './pages/tools-page/tools-page.component';
import { CreateToolPageComponent } from './pages/create-tool-page/create-tool-page.component';
import { adminGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    component: ToolsPageComponent,
  },
  {
    path: 'new',
    component: CreateToolPageComponent,
    canActivate: [adminGuard],
  },
];
