import { CreateToolPageComponent } from '../../../../../app/features/tools/pages/create-tool-page/create-tool-page.component';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { RouterMock } from 'src/tests/mocks';

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
