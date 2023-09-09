import { Component, Input, OnInit, inject } from '@angular/core';
import { ToolDTO } from '../../models/tool.model';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'wdt-preview-card',
  templateUrl: './preview-card.component.html',
})
export class PreviewCardComponent implements OnInit {
  private toolsService = inject(ToolsService);

  tool: ToolDTO | undefined;

  ngOnInit(): void {
    this.toolsService.tool$.subscribe((data) => {
      this.tool = data;
    });
  }
}
