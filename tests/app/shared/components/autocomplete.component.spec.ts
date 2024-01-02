import { DestroyRef } from '@angular/core';

import { AutocompleteComponent } from '@shared/components';
import { DestroyRefMock } from '@tests/mocks';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let destroyRef: DestroyRef = DestroyRefMock;

  beforeEach(() => {
    component = new AutocompleteComponent(destroyRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
