import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '@auth0/auth0-angular';
import { Chart } from 'chart.js/auto';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['']);

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chart on ngOnInit', () => {
    spyOn(component as any, 'initChart');
    component.ngOnInit();
    expect(component['initChart']).toHaveBeenCalled();
  });

  it('should destroy chart on ngOnDestroy', () => {
    const mockChart = { destroy: jasmine.createSpy('destroy') };
    component['chart'] = mockChart as unknown as Chart;
    component.ngOnDestroy();
    expect(mockChart.destroy).toHaveBeenCalled();
  });
});