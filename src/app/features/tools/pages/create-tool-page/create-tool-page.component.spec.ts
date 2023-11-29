import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToolPageComponent } from './create-tool-page.component';

describe('CreateToolPageComponent', () => {
  let component: CreateToolPageComponent;
  let fixture: ComponentFixture<CreateToolPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateToolPageComponent]
    });
    fixture = TestBed.createComponent(CreateToolPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
