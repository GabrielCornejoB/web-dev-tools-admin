import { CreateToolPageComponent } from './create-tool-page.component';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { RouterMock } from '@testing/mocks';

describe('CreateToolPageComponent', () => {
  let component: CreateToolPageComponent = Injector.create({
    providers: [
      { provide: CreateToolPageComponent },
      {
        provide: Router,
        useValue: RouterMock,
      },
    ],
  }).get(CreateToolPageComponent);

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
