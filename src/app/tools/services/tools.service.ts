import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  docData,
  updateDoc,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import { Tool, CreateToolDTO, UpdateToolDTO } from '../models/tool.model';

const COLLECTION_NAME = 'tools';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(private firestore: Firestore) {}

  public getAll(): Observable<Tool[]> {
    return collectionData(collection(this.firestore, COLLECTION_NAME), {
      idField: 'id',
    }) as Observable<Tool[]>;
  }

  public getAllByCategory(category: string): Observable<Tool[]> {
    const collRef = collection(this.firestore, COLLECTION_NAME);
    return collectionData(query(collRef, where('category', '==', category)), {
      idField: 'id',
    }) as Observable<Tool[]>;
  }

  public getOne(id: string): Observable<Tool> {
    const docRef = doc(this.firestore, COLLECTION_NAME, id);
    return docData(docRef, { idField: 'id' }) as Observable<Tool>;
  }

  public create(dto: CreateToolDTO) {
    return from(addDoc(collection(this.firestore, COLLECTION_NAME), dto));
  }

  public update(id: string, dto: UpdateToolDTO) {
    const docRef = doc(this.firestore, COLLECTION_NAME, id);
    return updateDoc(docRef, dto);
  }
}
