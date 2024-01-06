import { Injectable } from '@angular/core';

import { FirestoreService } from './firestore.service';
import { Tool } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(private firestoreService: FirestoreService) {}

  //* Attributes
  readonly collectionName = 'tools';

  //* Functions
  getTool(uid: string): Observable<Tool | null> {
    return this.firestoreService.getDocumentById(this.collectionName, uid);
  }

  createTool(tool: Tool) {
    const { uid, ...toolWithoutId } = tool;
    return this.firestoreService.createDocumentWithId(
      this.collectionName,
      toolWithoutId,
      uid,
    );
  }
}
