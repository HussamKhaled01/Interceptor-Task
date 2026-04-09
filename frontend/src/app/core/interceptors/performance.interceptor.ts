import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

/*
 * Performance Interceptor
 * This interceptor measures the time it takes for an HTTP request to complete.
 * It logs the result to the browser console, which is useful for debugging 
 * and performance monitoring in real-world applications.
 */
export const performanceInterceptor: HttpInterceptorFn = (req, next) => {
  // Record the start time (in milliseconds)
  const startTime = Date.now();

  // Log that the request has started
  console.log(`[Performance] Starting ${req.method} ${req.url}`);

  return next(req).pipe(
    // finalize runs when the request completes
    finalize(() => {
      // Calculate final duration
      const duration = Date.now() - startTime;

      // Log the timing result
      console.log(`[Performance] 🏁 Finished ${req.method} ${req.url} in ${duration}ms`);
    })
  );
};
