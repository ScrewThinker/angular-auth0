import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PaymentsComponent } from './payments.component';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsComponent ],
      imports: [ FormsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new payment', () => {
    const initialLength = component.payments.length;
    component.newPayment = {
      id: 0,
      memberName: 'Test Member',
      amount: 100,
      date: '2023-08-15',
      status: 'completed',
      type: 'Monthly Membership',
      method: 'Credit Card'
    };

    component.addPayment();
    expect(component.payments.length).toBe(initialLength + 1);
    expect(component.payments[component.payments.length - 1].memberName).toBe('Test Member');
  });

  it('should delete payment', () => {
    const initialLength = component.payments.length;
    const paymentToDelete = component.payments[0];
    
    component.deletePayment(paymentToDelete.id);
    expect(component.payments.length).toBe(initialLength - 1);
    expect(component.payments.find(p => p.id === paymentToDelete.id)).toBeUndefined();
  });

  it('should get correct status color', () => {
    expect(component.getStatusColor('completed')).toBe('success');
    expect(component.getStatusColor('pending')).toBe('warning');
    expect(component.getStatusColor('failed')).toBe('danger');
    expect(component.getStatusColor('unknown')).toBe('');
  });
});