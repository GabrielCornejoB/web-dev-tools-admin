import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
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
    return collectionData(collection(this.firestore, 'tools'), {
      idField: 'id',
    }) as Observable<Tool[]>;
  }
  public create(dto: ToolDTO) {
    return addDoc(collection(this.firestore, 'tools'), dto);
  }
}
