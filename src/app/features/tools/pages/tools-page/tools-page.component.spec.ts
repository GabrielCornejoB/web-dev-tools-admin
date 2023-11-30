import { ToolsPageComponent } from './tools-page.component';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { RouterMock } from '@testing/mocks';

describe('ToolsPageComponent', () => {
  let component: ToolsPageComponent = Injector.create({
    providers: [
      { provide: ToolsPageComponent },
      {
        provide: Router,
        useValue: RouterMock,
      },
    ],
  }).get(ToolsPageComponent);

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
