import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ToolDetailPageComponent } from './pages/tool-detail-page/tool-detail-page.component';
import { ToolListPageComponent } from './pages/tool-list-page/tool-list-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ToolsLayoutComponent } from './tools-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    FormPageComponent,
    ToolDetailPageComponent,
    ToolListPageComponent,
    DashboardPageComponent,
    ToolsLayoutComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, ToolsRoutingModule],
})
export class ToolsModule {}
