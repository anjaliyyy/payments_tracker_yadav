import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.html',
  styleUrls: ['./vendors.css']
})
export class VendorsComponent implements OnInit {
  vendors: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getVendors().subscribe({
      next: (data) => this.vendors = data,
      error: (err) => console.error('Error loading vendors', err)
    });
  }
}
