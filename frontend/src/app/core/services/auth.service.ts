import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  token: string;
  email: string;
  expiresAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Authenticates the user with the backend API.
   * On success, it persists the JWT token and user email to local storage.
   */
  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(res => {
          // Persistence: Storing the token ensures the user stays logged in after a page refresh
          localStorage.setItem('token', res.token);
          localStorage.setItem('email', res.email);
        })
      );
  }

  /**
   * Clears the user session and redirects to the login page.
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

  /**
   * Retrieves the current JWT token from local storage.
   * Returns null if the user is not authenticated.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Retrieves the email address of the currently logged-in user.
   */
  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  /**
   * Quick check to see if a session exists.
   * used by Router Guards and UI elements.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
