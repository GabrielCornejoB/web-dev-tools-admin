import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ToolDetailPageComponent } from './pages/tool-detail-page/tool-detail-page.component';
import { ToolListPageComponent } from './pages/tool-list-page/tool-list-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ToolsLayoutComponent } from './tools-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormControlInputComponent } from './components/form-control-input/form-control-input.component';
import { FormControlTextareaComponent } from './components/form-control-textarea/form-control-textarea.component';
import { FormControlSelectComponent } from './components/form-control-select/form-control-select.component';
import { ArrayTitlecasePipe } from './pipes/array-titlecase.pipe';
import { ArrayUppercasePipe } from './pipes/array-uppercase.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormPageComponent,
    ToolDetailPageComponent,
    ToolListPageComponent,
    DashboardPageComponent,
    ToolsLayoutComponent,
    NavbarComponent,
    FormControlInputComponent,
    FormControlTextareaComponent,
    FormControlSelectComponent,
    ArrayTitlecasePipe,
    ArrayUppercasePipe,
  ],
  imports: [CommonModule, ToolsRoutingModule, ReactiveFormsModule],
})
export class ToolsModule {}
