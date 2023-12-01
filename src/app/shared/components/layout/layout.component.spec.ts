import { Router } from '@angular/router';
import { RouterMock } from '@testing/mocks';
import { Injector } from '@angular/core';

import { LayoutComponent } from './layout.component';

describe('Layout - Component', () => {
  let component: LayoutComponent = Injector.create({
    providers: [
      { provide: LayoutComponent },
      {
        provide: Router,
        useValue: RouterMock,
      },
    ],
  }).get(LayoutComponent);

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
