import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

/*
 * Loading Interceptor
 * This interceptor notifies the LoadingService when a request starts and ends.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Turn on the spinner
  loadingService.show();

  return next(req).pipe(
    // Turn off the spinner when the request is done
    finalize(() => {
      // We wrap it in a small timeout to prevent "flickering" 
      setTimeout(() => {
        loadingService.hide();
      }, 200);
    })
  );
};
