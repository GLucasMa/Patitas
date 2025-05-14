import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/">
              <img src="assets/PatitaRoja.png" alt="Logo Patitas" class="logo-img" />
              <h1>Patitas<span>Tienda</span></h1>
            </a>
          </div>
          
          <nav class="main-nav">
            <ul class="nav-links">
              <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a></li>
              <li><a routerLink="/products" routerLinkActive="active">Productos</a></li>
              
              <!-- Show admin links for admin users -->
              <li *ngIf="currentUser && isAdmin">
                <a routerLink="/admin" routerLinkActive="active">Admin</a>
              </li>
            </ul>
          </nav>
          
          <div class="user-actions">
            <!-- Cart with item count -->
            <a routerLink="/cart" class="cart-icon" *ngIf="currentUser">
              <span class="material-icons">shopping_cart</span>
              <span class="cart-count" *ngIf="cartItemsCount > 0">{{ cartItemsCount }}</span>
            </a>
            
            <!-- User menu (when logged in) -->
            <div class="user-dropdown" *ngIf="currentUser">
              <button class="user-dropdown-toggle">
                {{ currentUser.name }}
                <span class="material-icons">arrow_drop_down</span>
              </button>
              <div class="user-dropdown-menu">
                <a routerLink="/profile">Mi Perfil</a>
                <a routerLink="/profile/orders">Mis Pedidos</a>
                <button (click)="logout()">Cerrar Sesión</button>
              </div>
            </div>
            
            <!-- Login/Register buttons (when not logged in) -->
            <div class="auth-buttons" *ngIf="!currentUser">
              <a routerLink="/auth/login" class="btn btn-outline">Iniciar Sesión</a>
              <a routerLink="/auth/register" class="btn btn-primary">Registrarse</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
      .logo a {
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    .logo-img {
      width: 40px;
      height: auto;
      margin-right: 10px;
    }

    .site-header {
      background-color: var(--background-light);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 16px 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo h1 {
      font-size: 24px;
      font-weight: 700;
      color: var(--primary-color);
      margin: 0;
    }
    
    .logo h1 span {
      color: var(--secondary-color);
    }
    
    .nav-links {
      display: flex;
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-links li {
      margin: 0 16px;
    }
    
    .nav-links a {
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      padding: 8px 0;
      position: relative;
    }
    
    .nav-links a:hover, .nav-links a.active {
      color: var(--primary-color);
    }
    
    .nav-links a.active::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: var(--primary-color);
      bottom: 0;
      left: 0;
    }
    
    .user-actions {
      display: flex;
      align-items: center;
    }
    
    .auth-buttons {
      display: flex;
      gap: 12px;
    }
    
    .cart-icon {
      position: relative;
      margin-right: 16px;
      display: flex;
      align-items: center;
      color: var(--text-primary);
      text-decoration: none;
    }
    
    .cart-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: var(--primary-color);
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }
    
    .user-dropdown {
      position: relative;
    }
    
    .user-dropdown-toggle {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 500;
      color: var(--text-primary);
      padding: 8px;
    }
    
    .user-dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: var(--background-light);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      min-width: 160px;
      display: none;
      z-index: 1000;
    }
    
    .user-dropdown:hover .user-dropdown-menu {
      display: block;
    }
    
    .user-dropdown-menu a, 
    .user-dropdown-menu button {
      display: block;
      padding: 8px 16px;
      color: var(--text-primary);
      text-decoration: none;
      text-align: left;
      width: 100%;
      background: none;
      border: none;
      cursor: pointer;
    }
    
    .user-dropdown-menu a:hover, 
    .user-dropdown-menu button:hover {
      background-color: var(--background-grey);
    }
    
    /* Responsive styles */
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 16px;
      }
      
      .nav-links {
        margin: 16px 0;
      }
      
      .user-actions {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HeaderComponent {
  currentUser: User | null = null;
  isAdmin = false;
  cartItemsCount = 0;
  
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAdmin = user?.role === 'admin';
    });
    
    this.cartService.cartItems$.subscribe(() => {
      this.cartItemsCount = this.cartService.getCartTotalItems();
    });
  }
  
  logout(): void {
    this.authService.logout();
  }
}