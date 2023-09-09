import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsLayoutComponent } from './tools-layout.component';

describe('ToolsLayoutComponent', () => {
  let component: ToolsLayoutComponent;
  let fixture: ComponentFixture<ToolsLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolsLayoutComponent]
    });
    fixture = TestBed.createComponent(ToolsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
