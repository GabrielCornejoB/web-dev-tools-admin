import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Tool } from '../../models/tool.model';
import { ToolsService } from '../../services/tools.service';
import { Subscription } from 'rxjs';
import { Category } from '../../models/category.model';

@Component({
  selector: 'wdt-list-page',
  templateUrl: './tool-list-page.component.html',
})
export class ToolListPageComponent implements OnInit, OnDestroy {
  private toolsService = inject(ToolsService);

  public tools: Tool[] = [];
  public activeCategory: string | null = null;

  private toolsSubscription: Subscription = new Subscription();
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllTools();
  }
  ngOnDestroy(): void {
    this.toolsSubscription.unsubscribe();
  }

  public get categories(): string[] {
    return Object.values(Category);
  }

  public getAllTools() {
    this.activeCategory = null;
    this.toolsSubscription = this.toolsService.getAll().subscribe((data) => {
      this.tools = data;
      this.isLoading = false;
    });
  }

  public getFilteredTools(category: string) {
    this.activeCategory = category;
    const filteredTools: Tool[] = [];
    this.toolsService.getAllByCategory(category).then((qs) => {
      qs.forEach((doc) => {
        filteredTools.push({ ...doc.data(), id: doc.id } as Tool);
      });
      this.tools = filteredTools;
    });
  }
}
