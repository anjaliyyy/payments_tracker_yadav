import { Routes } from '@angular/router';
import { VendorsComponent } from './components/vendors/vendors';
import { DashboardComponent } from './components/dashboard/dashboard';  // added this import

export const routes: Routes = [
  { path: '', component: VendorsComponent },   // default route
  { path: 'dashboard', component: DashboardComponent },  // new dashboard route
];
