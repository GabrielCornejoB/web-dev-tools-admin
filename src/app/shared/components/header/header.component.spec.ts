import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { RouterMock, StoreMock } from '@testing/mocks';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent = Injector.create({
    providers: [
      { provide: HeaderComponent },
      { provide: Store, useValue: StoreMock },
      {
        provide: Router,
        useValue: RouterMock,
      },
    ],
  }).get(HeaderComponent);

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
