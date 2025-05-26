import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'products',
    loadComponent: () => 
      import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => 
      import('./features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => 
      import('./features/cart/cart.component').then(m => m.CartComponent),
    canActivate: [authGuard]
  },
/*  {
    path: 'checkout',
    loadComponent: () => 
      import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [authGuard]
  }, */
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => 
          import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => 
          import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: 'profile',
    children: [
/*       {
        path: '',
        loadComponent: () => 
          import('./features/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
      },
      {
        path: 'orders',
        loadComponent: () => 
          import('./features/profile/order-history/order-history.component').then(m => m.OrderHistoryComponent),
        canActivate: [authGuard]
      } */
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
     /*  {
        path: '',
        loadComponent: () => 
          import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'products',
        loadComponent: () => 
          import('./features/admin/product-management/product-management.component').then(m => m.ProductManagementComponent)
      },
      {
        path: 'products/new',
        loadComponent: () => 
          import('./features/admin/product-form/product-form.component').then(m => m.ProductFormComponent)
      },
      {
        path: 'products/edit/:id',
        loadComponent: () => 
          import('./features/admin/product-form/product-form.component').then(m => m.ProductFormComponent)
      },
      {
        path: 'orders',
        loadComponent: () => 
          import('./features/admin/order-management/order-management.component').then(m => m.OrderManagementComponent)
      } */
    ]
  },
  {
    path: '**',
    loadComponent: () => 
      import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: 'lista',
    loadComponent: () => 
      import('./features/users/lista-usuarios.component').then(m => m.ListaUsuariosComponent)
  },
];