import { FirestoreService } from '@core/services';

/**
 * FirestoreService mock meant to be used in Unit Tests
 */
export const FirestoreServiceMock = {
  getDocuments: jest.fn(),
  getDocumentById: jest.fn(),
  createDocument: jest.fn(),
  createDocumentWithId: jest.fn(),
} as any as FirestoreService;
