import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  // Redirect to login page
  notificationService.showInfo('Debe iniciar sesión para acceder a esta página');
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  
  return false;
};