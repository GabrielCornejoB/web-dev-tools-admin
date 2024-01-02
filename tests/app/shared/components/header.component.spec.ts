import { Store } from '@ngrx/store';

import { HeaderComponent } from '@shared/components';
import { StoreMock } from '@tests/mocks';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let store: Store = StoreMock;

  beforeEach(() => {
    component = new HeaderComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
