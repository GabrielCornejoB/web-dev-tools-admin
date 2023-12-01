import { Observable, defer, from } from 'rxjs';

/** Utility function that transforms a Promise into a Observable. This observable is created lazily, meaning that the request is not made until you subscribe. */
export const toObservable = <T>(promise: Promise<T>): Observable<T> => {
  return defer(() => from(promise));
};
