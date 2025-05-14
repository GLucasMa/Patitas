import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  isAuthenticated = false;
  
  constructor(
    private cartService: CartService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  
  addToCart(): void {
    if (!this.isAuthenticated) {
      this.notificationService.showInfo('Debe iniciar sesión para agregar productos al carrito');
      return;
    }
    
    if (this.product.stock > 0) {
      this.cartService.addToCart(this.product);
      this.notificationService.showSuccess(`${this.product.name} añadido al carrito`);
    } else {
      this.notificationService.showError('Producto sin stock disponible');
    }
  }
}