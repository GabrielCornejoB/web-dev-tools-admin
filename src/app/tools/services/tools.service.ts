import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Tool, ToolDTO } from '../models/tool.model';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  private tool = new BehaviorSubject<ToolDTO | undefined>(undefined);
  public tool$ = this.tool.asObservable();

  constructor(private firestore: Firestore) {}

  public updatePreviewTool(tool: ToolDTO): void {
    this.tool.next(tool);
  }

  public getAll(): Observable<Tool[]> {
    return collectionData(collection(this.firestore, 'tools')) as Observable<
      Tool[]
    >;
  }
}
