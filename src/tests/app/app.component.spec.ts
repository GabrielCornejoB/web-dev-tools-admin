import { Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreMock } from '@tests/mocks';
import { AppComponent } from 'src/app/app.component';

describe('App - Component', () => {
  let component = Injector.create({
    providers: [
      { provide: AppComponent },
      { provide: Store, useValue: StoreMock },
    ],
  }).get(AppComponent);
  let storeMock: Partial<Store> = StoreMock;

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch getCurrentUser action', () => {
    component.ngOnInit();

    expect(storeMock.dispatch).toHaveBeenCalled();
  });
});
