import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Tool } from '../../models/tool.model';
import { ToolsService } from '../../services/tools.service';
import { Subscription, combineLatest } from 'rxjs';
import { ALL_CATEGORIES, Category } from '../../models/category.model';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectIsLoading,
  selectTools,
} from '../../store/reducers';
import { toolsActions } from '../../store/actions';

@Component({
  selector: 'wdt-list-page',
  templateUrl: './tool-list-page.component.html',
})
export class ToolListPageComponent implements OnInit {
  private store = inject(Store);

  public activeCategory: Category | null = null;

  public data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    tools: this.store.select(selectTools),
  });

  ngOnInit(): void {
    this.getAllTools();
  }

  public get categories(): Category[] {
    return [...ALL_CATEGORIES];
  }

  public getAllTools(): void {
    this.store.dispatch(toolsActions.getTools());
    this.activeCategory = null;
  }
  public getFilteredTools(category: Category): void {
    this.store.dispatch(toolsActions.getFilteredTools({ category }));
    this.activeCategory = category;
  }
  public deleteTool(id: string): void {
    this.store.dispatch(toolsActions.deleteTool({ id }));
  }
}
