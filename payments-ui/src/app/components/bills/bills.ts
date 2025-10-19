import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ApiService } from '../../services/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './bills.html',
  styleUrls: ['./bills.css']
})
export class BillsComponent implements OnInit, OnDestroy {
  bills: any[] = [];
  vendorId: string | null = null;
  private sub?: Subscription;
  private refreshSub?: Subscription;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // Subscribe to vendor selection changes
    this.sub = this.api.selectedVendorId$.subscribe((id) => {
      this.vendorId = id;
      if (this.vendorId) {
        this.loadBills(this.vendorId);
      } else {
        this.bills = [];
      }
    });

    // When a payment is added, refresh bills automatically
    this.refreshSub = this.api.refreshNeeded$.subscribe(() => {
      if (this.vendorId) {
        this.loadBills(this.vendorId);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.refreshSub?.unsubscribe();
  }

  loadBills(vendorId: string): void {
    this.api.getBills(vendorId).subscribe({
      next: (bills) => (this.bills = bills),
      error: (err) => {
        console.error('Error fetching bills:', err);
        this.bills = [];
      },
    });
  }

  balance(b: any) {
    return (b.amount ?? 0) - (b.paidAmount ?? 0);
  }
}
