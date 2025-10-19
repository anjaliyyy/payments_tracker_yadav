import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './vendors.html',
})
export class VendorsComponent implements OnInit {
  vendors: any[] = [];
  selectedVendorId: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadVendors();

    // automatically reload vendors when a payment is added
    this.api.refreshNeeded$.subscribe(() => this.loadVendors());
  }

  loadVendors(): void {
    this.api.getVendors().subscribe({
      next: (data) => {
        // normalize to fields we display
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

  viewBills(vendor: any): void {
    if (!vendor?.vendorId) return;

    // tell BillsComponent which vendor to load
    this.api.setSelectedVendor(vendor.vendorId);

    // update URL with vendorId (so BillsComponent picks it up too)
    const url = new URL(window.location.href);
    url.searchParams.set('vendorId', vendor.vendorId);
    window.history.replaceState({}, '', url);

    // smooth scroll to the Bills section
    const anchor = document.getElementById('bills');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
