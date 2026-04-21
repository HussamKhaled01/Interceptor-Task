import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ApiResponse } from '../../core/models/api-response.model';
import { Product } from '../../core/models/product.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<ApiResponse<Product[]>>(`${environment.apiUrl}/products`).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.data;
        } else {
          this.error = res.message;
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
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
