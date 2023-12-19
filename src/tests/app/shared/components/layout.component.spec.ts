import { Router } from '@angular/router';
import { RouterMock } from 'src/tests/mocks';
import { Injector } from '@angular/core';

import { LayoutComponent } from '../../../../app/shared/components/layout/layout.component';

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
