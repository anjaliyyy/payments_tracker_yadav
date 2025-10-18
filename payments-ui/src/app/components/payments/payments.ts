import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.html',
  styleUrls: ['./payments.css']
})
export class PaymentsComponent implements OnInit {
  vendors: any[] = [];
  bills: any[] = [];
  payments: any[] = [];

  selectedVendorId: string | null = null;
  selectedBillId: string | null = null;

  amount: number | null = null;
  method: string = 'Manual';
  paymentDate: string = new Date().toISOString().slice(0, 16);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  private loadVendors(): void {
    this.api.getVendors().subscribe({
      next: (rows) => {
        this.vendors = rows || [];
        if (this.vendors.length > 0 && !this.selectedVendorId) {
          this.selectedVendorId = this.vendors[0].vendorId;
          this.onVendorChange();
        }
      },
      error: (e) => console.error('vendors error', e)
    });
  }

  onVendorChange(): void {
    this.bills = [];
    this.payments = [];
    this.selectedBillId = null;

    if (!this.selectedVendorId) return;

    this.api.getBills(this.selectedVendorId).subscribe({
      next: (rows) => {
        this.bills = rows || [];
        if (this.bills.length > 0) {
          this.selectedBillId = this.bills[0].billId;
        }
      },
      error: (e) => console.error('bills error', e)
    });
  }

  loadPayments(): void {
    if (!this.selectedBillId) {
      this.payments = [];
      return;
    }
    this.api.getPayments(this.selectedBillId).subscribe({
      next: (rows) => (this.payments = rows || []),
      error: (e) => {
        console.error('payments error', e);
        this.payments = [];
      }
    });
  }

  addPayment(): void {
    if (!this.selectedBillId || !this.amount) {
      alert('Please select a bill and enter an amount.');
      return;
    }

    const payload = {
      billId: this.selectedBillId,
      amount: Number(this.amount),
      method: this.method,
      paymentDate: new Date(this.paymentDate).toISOString()
    };

    this.api.addPayment(payload).subscribe({
      next: () => {
        this.loadPayments();
        this.amount = null;
      },
      error: (e) => {
        console.error('add payment error', e);
        alert('Failed to add payment.');
      }
    });
  }
}
