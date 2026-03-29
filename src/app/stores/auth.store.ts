import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  readonly credentials = signal<{ username: string; password: string } | null>(
    this.loadFromStorage()
  );

  setCredentials(username: string, password: string) {
    this.credentials.set({ username, password });
    localStorage.setItem('auth', btoa(`${username}:${password}`));
  }

  clear() {
    this.credentials.set(null);
    localStorage.removeItem('auth');
  }

  private loadFromStorage(): { username: string; password: string } | null {
    const stored = localStorage.getItem('auth');
    if (!stored) return null;
    const [username, password] = atob(stored).split(':');
    return { username, password };
  }
}
