import { Component, Input, OnInit, inject, OnDestroy } from '@angular/core';
import { ToolDTO } from '../../models/tool.model';
import { ToolsService } from '../../services/tools.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wdt-preview-card',
  templateUrl: './preview-card.component.html',
})
export class PreviewCardComponent implements OnInit, OnDestroy {
  private toolsService = inject(ToolsService);

  public tool: ToolDTO | undefined;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.toolsService.tool$.subscribe((data) => {
      this.tool = data;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
