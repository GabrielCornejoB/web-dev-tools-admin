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
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Tool, CreateToolDTO, UpdateToolDTO } from '../models/tool.model';
import { Category } from '../models/category.model';

const COLLECTION_NAME = 'tools';

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
    return collectionData(collection(this.firestore, COLLECTION_NAME), {
      idField: 'id',
    }) as Observable<Tool[]>;
  }

  public getAllByCategory(category: string) {
    const collRef = collection(this.firestore, COLLECTION_NAME);
    return getDocs(query(collRef, where('category', '==', category)));
  }

  public getOne(id: string) {
    const docRef = doc(this.firestore, COLLECTION_NAME, id);
    return getDoc(docRef);
  }

  public create(dto: CreateToolDTO) {
    return addDoc(collection(this.firestore, COLLECTION_NAME), dto);
  }

  public update(id: string, dto: UpdateToolDTO) {
    const docRef = doc(this.firestore, COLLECTION_NAME, id);
    return updateDoc(docRef, dto);
  }
}
