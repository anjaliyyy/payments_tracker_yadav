import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5117/api'; // or your backend URL

  // emit when payment/bill/vendor data needs refreshing
  private _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  // vendor selection behavior
  private selectedVendorId = new BehaviorSubject<string | null>(null);
  selectedVendorId$ = this.selectedVendorId.asObservable();

  constructor(private http: HttpClient) {}

  // vendor management
  getVendors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vendors`);
  }

  // bills for a specific vendor
  getBills(vendorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/bills?vendorId=${vendorId}`);
  }

  // payments for a specific bill
  getPayments(billId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/payments?billId=${billId}`);
  }

  // add new payment and trigger refresh
  addPayment(payment: any): Observable<any> {
    return new Observable((observer) => {
      this.http.post<any>(`${this.baseUrl}/payments`, payment).subscribe({
        next: (res) => {
          observer.next(res);
          this._refreshNeeded$.next(); // trigger refresh event
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  // tell other components which vendor is selected
  setSelectedVendor(vendorId: string) {
    this.selectedVendorId.next(vendorId);
  }
}
