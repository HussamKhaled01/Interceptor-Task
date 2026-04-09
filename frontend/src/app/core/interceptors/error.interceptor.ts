import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';

/*
 * Global Error Interceptor
 * This interceptor catches all HTTP errors and shows a toast notification.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.status === 0) {
        errorMessage = 'Cannot connect to the server. Is the backend running?';
      } else if (error.status === 401) {
        errorMessage = 'Your session has expired. Please log in again.';
        authService.logout();
      } else if (error.status === 403) {
        errorMessage = 'Access Denied: You do not have permission for this action.';
      } else if (error.status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (error.status >= 500) {
        errorMessage = 'The server encountered an error. Please try again later.';
      } else if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }

      // Show the error toast
      toastService.showError(errorMessage);

      // Re-throw the error so the browser console still shows the network error
      return throwError(() => error);
    })
  );
};
