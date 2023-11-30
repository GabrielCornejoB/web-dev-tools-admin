import { HeaderComponent } from './header.component';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { RouterMock } from '@testing/mocks';

describe('HeaderComponent', () => {
  let component: HeaderComponent = Injector.create({
    providers: [
      { provide: HeaderComponent },
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
