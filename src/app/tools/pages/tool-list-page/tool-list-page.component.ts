import { Component, OnInit, inject } from '@angular/core';
import { Tool } from '../../models/tool.model';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'wdt-list-page',
  templateUrl: './tool-list-page.component.html',
})
export class ToolListPageComponent implements OnInit {
  private toolsService = inject(ToolsService);
  public tools: Tool[] = [];
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.toolsService.getAll().subscribe((data) => {
      this.tools = data;
      this.isLoading = false;
    });
  }
}
