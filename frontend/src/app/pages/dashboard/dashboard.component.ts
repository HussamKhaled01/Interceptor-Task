import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

interface ProductsResponse {
  requestedBy: string;
  products: { id: number; name: string; price: number }[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  products: { id: number; name: string; price: number }[] = [];
  requestedBy = '';
  loading = true;
  error = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<ProductsResponse>(`${environment.apiUrl}/products`).subscribe({
      next: (res) => {
        this.products = res.products;
        this.requestedBy = res.requestedBy;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  get email() {
    return this.authService.getEmail();
  }

  runAdminAction() {
    this.http.get<{ message: string }>(`${environment.apiUrl}/auth/admin-check`).subscribe({
      next: (res) => {
        alert(`✅ SUCCESS: ${res.message}`);
      }
    });
  }

  runForbiddenAction() {
    this.http.get<{ message: string }>(`${environment.apiUrl}/auth/fail-check`).subscribe({
      next: (res) => {
        alert(`❓ UNEXPECTED: ${res.message}`);
      }
    });
  }
}
