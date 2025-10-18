import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './vendors.html',
})
export class VendorsComponent {
  vendors: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.api.getVendors().subscribe({
      next: (data) => {
        // normalize to the fields we display
        this.vendors = (data ?? []).map((v: any) => ({
          vendorId: v.vendorId,
          vendorName: v.vendorName,
          category: v.category || '—',
          balance: v.balanceOwed ?? v.balance ?? 0,
        }));
      },
      error: (err) => console.error('Error loading vendors:', err),
    });
  }

  // Wire the button to your existing app flow:
  // ApiService.setSelectedVendor(...) notifies Bills to reload.
  viewBills(vendor: any): void {
    if (!vendor?.vendorId) return;
    this.api.setSelectedVendor(vendor.vendorId);

    // Optional: smooth-scroll to bills section if you add id="bills" on its <h2>
    const anchor = document.getElementById('bills');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
