import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  vendors: any[] = [];
  totalVendors = 0;
  totalOutstanding = 0;
  fullyPaidVendors = 0;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  chartLabels: string[] = ['Outstanding', 'Cleared'];
  chartData: number[] = [0, 0];
  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#111827', font: { size: 13 } },
      },
    },
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.api.refreshNeeded$.subscribe(() => this.loadDashboardData());

  }

  loadDashboardData() {
    this.api.getVendors().subscribe({
      next: (data: any[]) => {
        this.vendors = data;
        this.updateStats();
      },
      error: (err) => console.error('Error loading dashboard data:', err),
    });
  }

  updateStats() {
    this.totalVendors = this.vendors.length;
    this.totalOutstanding = this.vendors.reduce(
      (sum, v) => sum + (v.balanceOwed || 0),
      0
    );
    this.fullyPaidVendors = this.vendors.filter((v) => v.balanceOwed === 0).length;

    const cleared = this.fullyPaidVendors;
    const outstanding = this.vendors.length - cleared;
    this.chartData = [outstanding, cleared];
    this.chart?.update();
  }
}
