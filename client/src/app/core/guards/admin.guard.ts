import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  
  if (authService.isAuthenticated() && authService.isAdmin()) {
    return true;
  }
  
  if (!authService.isAuthenticated()) {
    // Not logged in, redirect to login
    notificationService.showInfo('Debe iniciar sesión para acceder a esta página');
    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  } else {
    // Logged in but not admin, redirect to home
    notificationService.showError('No tiene permisos para acceder a esta página');
    router.navigate(['/']);
  }
  
  return false;
};