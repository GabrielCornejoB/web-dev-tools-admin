import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ToolListPageComponent } from './pages/tool-list-page/tool-list-page.component';
import { ToolDetailPageComponent } from './pages/tool-detail-page/tool-detail-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
  },
  {
    path: 'create',
    component: FormPageComponent,
  },
  {
    path: 'update',
    component: FormPageComponent,
  },
  {
    path: 'all', // :category
    component: ToolListPageComponent,
  },
  {
    path: 'tool/:id',
    component: ToolDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsRoutingModule {}
