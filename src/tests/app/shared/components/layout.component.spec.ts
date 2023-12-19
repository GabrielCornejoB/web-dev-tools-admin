import { Router } from '@angular/router';
import { Injector } from '@angular/core';
import { LayoutComponent } from '@shared/components';
import { RouterMock } from '@tests/mocks';

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
