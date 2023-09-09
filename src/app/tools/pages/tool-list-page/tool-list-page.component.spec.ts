import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolListPageComponent } from './tool-list-page.component';

describe('ToolListPageComponent', () => {
  let component: ToolListPageComponent;
  let fixture: ComponentFixture<ToolListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolListPageComponent]
    });
    fixture = TestBed.createComponent(ToolListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
