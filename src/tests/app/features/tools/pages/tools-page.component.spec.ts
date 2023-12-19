import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { RouterMock } from '@tests/mocks';
import { ToolsPageComponent } from '@tools/pages/tools-page/tools-page.component';

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
