import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private chart: Chart | undefined;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.initChart();
  }

  private initChart() {
    const ctx = document.getElementById('incomeExpenseChart') as HTMLCanvasElement;
    if (!ctx) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Income',
            data: [5000, 6500, 6000, 8000, 9000, 12000, 14000, 13500, 13000, 11000, 10000, 9500],
            borderColor: '#00c7b5',
            backgroundColor: 'rgba(0, 199, 181, 0.1)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Expense',
            data: [3000, 4000, 3500, 5000, 6000, 7500, 8500, 9500, 8000, 7000, 6000, 6000],
            borderColor: '#ff5b5b',
            backgroundColor: 'rgba(255, 91, 91, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
                family: "'Poppins', sans-serif"
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            border: {
              display: true
            },
            grid: {
              display: true
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}