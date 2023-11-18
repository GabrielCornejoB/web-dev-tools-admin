import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutComponent } from './admin-layout.component';
import { AuthService } from '@core/services';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule, provideRouter } from '@angular/router';
import { environment } from '@env/environment';

describe('AdminLayout - Component', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminLayoutComponent,
        RouterModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
      ],
      providers: [AuthService, provideRouter([]), provideAnimations()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
