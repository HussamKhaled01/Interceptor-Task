import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  debugger
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  console.log(`[Interceptor] ➡ ${req.method} ${req.url}`);

  const cloned = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(cloned).pipe(
    tap({
      next: (event) => {
        console.log(`[Interceptor] ✅ Response received`, event);
      },
      error: (err) => {
        console.error(`[Interceptor] ❌ Request failed`, err);
        if (err.status === 401) {
          console.warn(`[Interceptor] 🚪 Unauthorized - redirecting to login`);
          authService.logout();
          router.navigate(['/login']);
        }
      },
      complete: () => {
        console.log(`[Interceptor] 🏁 Request complete`);
      }
    })
  );
};
