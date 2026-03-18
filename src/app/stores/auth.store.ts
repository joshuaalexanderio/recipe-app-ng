import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  readonly credentials = signal<{ username: string; password: string } | null>(null);

  setCredentials(username: string, password: string) {
    this.credentials.set({ username, password });
  }

  clear() {
    this.credentials.set(null);
  }
}
