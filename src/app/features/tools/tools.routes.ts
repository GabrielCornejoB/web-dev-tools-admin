import { Routes } from '@angular/router';

import { adminGuard } from '@core/guards';
import { ToolsPageComponent } from './pages/tools-page/tools-page.component';
import { CreateToolPageComponent } from './pages/create-tool-page/create-tool-page.component';

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
