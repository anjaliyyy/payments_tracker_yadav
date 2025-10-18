import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ApiService } from '../../services/api';
import { Subscription, switchMap, of } from 'rxjs';

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
  private bumpsub?: Subscription;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // when vendor changes OR bills are bumped, reload
    this.sub = this.api.selectedVendorId$
      .pipe(
        switchMap((id) => {
          this.vendorId = id;
          if (!id) return of([]);
          return this.api.getBills(id);
        })
      )
      .subscribe({
        next: (b) => (this.bills = b),
        error: () => (this.bills = [])
      });

    this.bumpsub = this.api.billsRefresh$.subscribe(() => {
      if (this.vendorId) {
        this.api.getBills(this.vendorId).subscribe({
          next: (b) => (this.bills = b),
          error: () => (this.bills = [])
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.bumpsub?.unsubscribe();
  }

  selectBill(b: any) {
    this.api.setSelectedBill(b.billId);
  }

  balance(b: any) {
    return (b.amount ?? 0) - (b.paidAmount ?? 0);
  }
}
