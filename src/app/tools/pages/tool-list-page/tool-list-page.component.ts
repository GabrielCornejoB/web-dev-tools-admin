import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Tool } from '../../models/tool.model';
import { ToolsService } from '../../services/tools.service';
import { Subscription } from 'rxjs';
import { ALL_CATEGORIES, Category } from '../../models/category.model';

@Component({
  selector: 'wdt-list-page',
  templateUrl: './tool-list-page.component.html',
})
export class ToolListPageComponent implements OnInit, OnDestroy {
  private toolsService = inject(ToolsService);

  public tools: Tool[] = [];
  public activeCategory: string | null = null;

  private subscriptions: Subscription[] = [];
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllTools();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public get categories(): string[] {
    return [...ALL_CATEGORIES];
  }

  public getAllTools() {
    this.activeCategory = null;
    this.subscriptions.push(
      this.toolsService.getAll().subscribe((data) => {
        this.tools = data;
        this.isLoading = false;
      }),
    );
  }

  public getFilteredTools(category: string) {
    this.activeCategory = category;
    this.subscriptions.push(
      this.toolsService
        .getAllByCategory(category)
        .subscribe((data) => (this.tools = data)),
    );
  }
}
