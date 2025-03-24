import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mock particlesJS globally
    (window as any).particlesJS = jasmine.createSpy('particlesJS');

    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up the mock after each test
    delete (window as any).particlesJS;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize particles on ngOnInit', () => {
    component.ngOnInit();
    expect((window as any).particlesJS).toHaveBeenCalledWith('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.5,
          random: false
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        }
      },
      retina_detect: true
    });
  });

  it('should call Auth0 login with redirect on loginWithAuth0', () => {
    component.loginWithAuth0();
    expect(authServiceSpy.loginWithRedirect).toHaveBeenCalledWith({
      appState: { target: '/dashboard' }
    });
  });
});