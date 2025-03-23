import { Component } from '@angular/core';

interface Payment {
  id: number;
  memberName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  type: string;
  method: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  payments: Payment[] = [
    {
      id: 1,
      memberName: 'John Doe',
      amount: 99.99,
      date: '2023-08-15',
      status: 'completed',
      type: 'Monthly Membership',
      method: 'Credit Card'
    },
    {
      id: 2,
      memberName: 'Jane Smith',
      amount: 150.00,
      date: '2023-08-14',
      status: 'pending',
      type: 'Personal Training',
      method: 'PayPal'
    }
  ];

  showAddPayment = false;
  newPayment: Payment = {
    id: 0,
    memberName: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    type: '',
    method: ''
  };

  addPayment() {
    this.newPayment.id = this.payments.length + 1;
    this.payments.push({...this.newPayment});
    this.showAddPayment = false;
    this.resetNewPayment();
  }

  deletePayment(id: number) {
    this.payments = this.payments.filter(payment => payment.id !== id);
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'danger';
      default: return '';
    }
  }

  private resetNewPayment() {
    this.newPayment = {
      id: 0,
      memberName: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      type: '',
      method: ''
    };
  }
}