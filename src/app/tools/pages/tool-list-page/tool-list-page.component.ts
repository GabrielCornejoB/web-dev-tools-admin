import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Tool } from '../../models/tool.model';
import { ToolsService } from '../../services/tools.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wdt-list-page',
  templateUrl: './tool-list-page.component.html',
})
export class ToolListPageComponent implements OnInit, OnDestroy {
  private toolsService = inject(ToolsService);
  public tools: Tool[] = [];

  private toolsSubscription: Subscription = new Subscription();
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.toolsSubscription = this.toolsService.getAll().subscribe((data) => {
      this.tools = data;
      this.isLoading = false;
    });
  }
  ngOnDestroy(): void {
    this.toolsSubscription.unsubscribe();
  }
}
