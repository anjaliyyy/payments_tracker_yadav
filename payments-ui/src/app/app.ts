import { Component } from '@angular/core';
import { VendorsComponent } from './components/vendors/vendors';
import { BillsComponent } from './components/bills/bills';
import { PaymentsComponent } from './components/payments/payments';
import { DashboardComponent } from './components/dashboard/dashboard';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    VendorsComponent,
    BillsComponent,
    PaymentsComponent,
    DashboardComponent,
    HttpClientModule
  ],
  templateUrl: './app.html'
})
export class AppComponent {}
