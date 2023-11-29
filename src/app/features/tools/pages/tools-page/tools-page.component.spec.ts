import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsPageComponent } from './tools-page.component';

describe('ToolsPageComponent', () => {
  let component: ToolsPageComponent;
  let fixture: ComponentFixture<ToolsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToolsPageComponent]
    });
    fixture = TestBed.createComponent(ToolsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
