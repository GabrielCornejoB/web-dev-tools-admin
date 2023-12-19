import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from '@shared/components';
import { StoreMock, RouterMock } from '@tests/mocks';

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
