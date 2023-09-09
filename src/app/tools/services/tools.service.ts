import { Injectable } from '@angular/core';
import { Tool, ToolDTO } from '../models/tool.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  private tool = new BehaviorSubject<ToolDTO | undefined>(undefined);
  public tool$ = this.tool.asObservable();

  constructor() {}

  public updateTool(tool: ToolDTO): void {
    this.tool.next(tool);
  }
}
