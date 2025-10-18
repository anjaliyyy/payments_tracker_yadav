import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // ✅ make sure this port matches your .NET backend
  private baseUrl = 'http://localhost:5117/api';

  // selection state
  private _selectedVendorId = new BehaviorSubject<string | null>(null);
  selectedVendorId$ = this._selectedVendorId.asObservable();

  private _selectedBillId = new BehaviorSubject<string | null>(null);
  selectedBillId$ = this._selectedBillId.asObservable();

  // light pub/sub to trigger reloads
  private _bumpVendors = new BehaviorSubject<number>(0);
  vendorsRefresh$ = this._bumpVendors.asObservable();

  private _bumpBills = new BehaviorSubject<number>(0);
  billsRefresh$ = this._bumpBills.asObservable();

  constructor(private http: HttpClient) {}

  // selection
  setSelectedVendor(id: string | null) {
    this._selectedVendorId.next(id);
    // when vendor changes, ask bills list to reload
    this._bumpBills.next(Date.now());
  }

  setSelectedBill(id: string | null) {
    this._selectedBillId.next(id);
  }

  // ✅ Vendors: GET /api/vendors
  getVendors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vendors`);
  }

  // ✅ Bills: GET /api/bills?vendorId={guid}
  getBills(vendorId: string): Observable<any[]> {
    const params = new HttpParams().set('vendorId', vendorId);
    return this.http.get<any[]>(`${this.baseUrl}/bills`, { params });
  }

  // ✅ Payments: GET /api/payments?billId={guid}
  getPayments(billId: string): Observable<any[]> {
    const params = new HttpParams().set('billId', billId);
    return this.http.get<any[]>(`${this.baseUrl}/payments`, { params });
  }

  // ✅ Payments: POST /api/payments
  addPayment(payload: { billId: string; amount: number; paymentDate: string; method: string }): Observable<any> {
    console.log('Posting payment to backend:', payload); // 🔍 debug log
    return this.http.post(`${this.baseUrl}/payments`, payload).pipe(
      tap({
        next: (res) => {
          console.log('✅ Payment added successfully:', res);
          this._bumpBills.next(Date.now());
          this._bumpVendors.next(Date.now());
        },
        error: (err) => {
          console.error('❌ Error adding payment:', err);
        },
      })
    );
  }
}
