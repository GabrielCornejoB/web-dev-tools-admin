import { Injector } from '@angular/core';
import { Router } from '@angular/router';

import { CreateToolPageComponent } from '@tools/pages/create-tool-page/create-tool-page.component';
import { RouterMock } from '@tests/mocks';

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
