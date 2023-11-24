import { Observable, defer, from } from 'rxjs';

export const toObservable = <T>(promise: Promise<T>): Observable<T> => {
  return defer(() => from(promise));
};
