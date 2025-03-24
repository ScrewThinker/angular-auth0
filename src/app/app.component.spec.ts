import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      isAuthenticated$: of(true)
    });

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AppComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    const initialMode = component.isDarkMode;
    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(!initialMode);
    expect(localStorage.getItem('theme')).toBe(component.isDarkMode ? 'dark' : 'light');
  });

  it('should toggle sidebar', () => {
    const initialState = component.isSidebarCollapsed;
    component.toggleSidebar();
    expect(component.isSidebarCollapsed).toBe(!initialState);
    expect(localStorage.getItem('sidebarCollapsed')).toBe(component.isSidebarCollapsed.toString());
  });

  it('should call auth service logout', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });

  it('should check if route is active', () => {
    Object.defineProperty(router, 'url', { get: () => '/dashboard' });
    expect(component.isActive('dashboard')).toBeTrue();
    expect(component.isActive('members')).toBeFalse();
  });
});