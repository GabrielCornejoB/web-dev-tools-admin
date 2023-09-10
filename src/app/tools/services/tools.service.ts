import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  updateDoc,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Tool, CreateToolDTO, UpdateToolDTO } from '../models/tool.model';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  private tool = new BehaviorSubject<CreateToolDTO | undefined>(undefined);
  public tool$ = this.tool.asObservable();

  constructor(private firestore: Firestore) {}

  public updatePreviewTool(tool: CreateToolDTO): void {
    this.tool.next(tool);
  }

  public getAll(): Observable<Tool[]> {
    return collectionData(collection(this.firestore, 'tools'), {
      idField: 'id',
    }) as Observable<Tool[]>;
  }
  public getOne(id: string) {
    const docRef = doc(this.firestore, 'tools', id);
    return getDoc(docRef);
  }
  public create(dto: CreateToolDTO) {
    return addDoc(collection(this.firestore, 'tools'), dto);
  }
  public update(id: string, dto: UpdateToolDTO) {
    const docRef = doc(this.firestore, 'tools', id);
    return updateDoc(docRef, dto);
  }
}
