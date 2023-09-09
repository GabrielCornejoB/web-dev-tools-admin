import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolDetailPageComponent } from './tool-detail-page.component';

describe('ToolDetailPageComponent', () => {
  let component: ToolDetailPageComponent;
  let fixture: ComponentFixture<ToolDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolDetailPageComponent]
    });
    fixture = TestBed.createComponent(ToolDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
