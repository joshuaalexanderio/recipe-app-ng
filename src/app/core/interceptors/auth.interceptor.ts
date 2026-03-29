import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../../stores/auth.store'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const credentials = authStore.credentials();

  if (credentials) {
    const encoded = btoa(`${credentials.username}:${credentials.password}`);
    req = req.clone({
      setHeaders: { Authorization: `Basic ${encoded}` },
      withCredentials: true
    });
  }

  return next(req);
};
