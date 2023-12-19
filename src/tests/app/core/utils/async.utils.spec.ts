import { toObservable } from '../../../../app/core/utils/async.utils';

describe('Async - Utils', () => {
  it('toObservable()', () => {
    const testPromise = new Promise(() => '123');

    const result = toObservable(testPromise);

    expect(result).toBeTruthy();
  });
});
