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

@Component({
  selector: 'wdt-list-page',
  templateUrl: './tool-list-page.component.html',
})
export class ToolListPageComponent {
  private store = inject(Store);

  public data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    tools: this.store.select(selectTools),
  });

  public get categories(): string[] {
    return [...ALL_CATEGORIES];
  }
}
