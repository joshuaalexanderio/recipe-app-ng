import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthStore } from '../../stores/auth.store'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const credentials = authStore.credentials();

  if (credentials) {
    const encoded = btoa(`${credentials.username}:${credentials.password}`);
    req = req.clone({
      setHeaders: { Authorization: `Basic ${encoded}` },
      withCredentials: true
    });
  }

  // Log out user if 401 since we currently aren't validating correct credentials in frontend
  return next(req).pipe(
    tap({ error: (err) => {
      if (err.status === 401) {
        authStore.clear();
        router.navigate(['/login']);
      }
    }})
  );
};
