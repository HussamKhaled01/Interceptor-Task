import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // We use a counter because multiple HTTP requests might be happening at once.
  // We only hide the spinner when the counter reaches 0.
  private activeRequests = signal(0);

  // Expose a read-only signal that components can use to show/hide the UI
  isLoading = computed(() => this.activeRequests() > 0);

  show() {
    this.activeRequests.update(count => count + 1);
  }

  hide() {
    this.activeRequests.update(count => Math.max(0, count - 1));
  }
}
