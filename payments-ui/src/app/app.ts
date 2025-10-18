import { Component } from '@angular/core';
import { VendorsComponent } from './components/vendors/vendors';
import { BillsComponent } from './components/bills/bills';
import { PaymentsComponent } from './components/payments/payments';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VendorsComponent, BillsComponent, PaymentsComponent],
  templateUrl: './app.html'
})
export class AppComponent {}
