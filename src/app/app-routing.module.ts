import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsLayoutComponent } from './tools/tools-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tools',
    pathMatch: 'full',
  },
  {
    path: 'tools',
    component: ToolsLayoutComponent,
    loadChildren: () =>
      import('./tools/tools.module').then((m) => m.ToolsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
