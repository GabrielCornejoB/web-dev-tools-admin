import { DashboardLayoutComponent } from './dashboard-layout.component';
import { Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreMock } from '@testing/mocks';

describe('DashboardLayoutComponent', () => {
  let component = Injector.create({
    providers: [
      { provide: DashboardLayoutComponent },
      { provide: Store, useValue: StoreMock },
    ],
  }).get(DashboardLayoutComponent);
  let storeMock: Partial<Store> = StoreMock;

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch logout action', () => {
    component.onClick();

    expect(storeMock.dispatch).toHaveBeenCalled();
  });
});
