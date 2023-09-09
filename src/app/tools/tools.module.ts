import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ToolDetailPageComponent } from './pages/tool-detail-page/tool-detail-page.component';
import { ToolListPageComponent } from './pages/tool-list-page/tool-list-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ToolsLayoutComponent } from './tools-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArrayTitlecasePipe } from './pipes/array-titlecase.pipe';
import { ArrayUppercasePipe } from './pipes/array-uppercase.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from './components/form-control/form-control.component';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';

@NgModule({
  declarations: [
    FormPageComponent,
    ToolDetailPageComponent,
    ToolListPageComponent,
    DashboardPageComponent,
    ToolsLayoutComponent,
    NavbarComponent,
    ArrayTitlecasePipe,
    ArrayUppercasePipe,
    FormControlComponent,
    PreviewCardComponent,
  ],
  imports: [CommonModule, ToolsRoutingModule, ReactiveFormsModule],
})
export class ToolsModule {}
