import { Component } from '@angular/core';
import { Tool } from '../../models/tool.model';

@Component({
  selector: 'wdt-list-page',
  templateUrl: './tool-list-page.component.html',
})
export class ToolListPageComponent {
  public tools: Tool[] = [];
}
