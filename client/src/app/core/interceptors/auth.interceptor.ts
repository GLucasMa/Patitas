import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  
  const token = authService.getToken();
  
  // Clone the request and add the token
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Unauthorized, clear auth data and redirect to login
        authService.logout();
        notificationService.showError('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        router.navigate(['/auth/login']);
      }
      
      // Show error message
      const errorMessage = error.error?.message || 'Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.';
      notificationService.showError(errorMessage);
      
      return throwError(() => error);
    })
  );
};