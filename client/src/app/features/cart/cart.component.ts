import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CartService, CartItem } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: `./cart.component.html`,
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  
  constructor(
    private cartService: CartService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }
  
  incrementQuantity(item: CartItem): void {
    if (item.quantity < item.product.stock) {
      item.quantity++;
      this.updateQuantity(item);
    }
  }
  
  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }
  
  updateQuantity(item: CartItem): void {
    // Ensure quantity is within valid range
    if (item.quantity < 1) {
      item.quantity = 1;
    } else if (item.quantity > item.product.stock) {
      item.quantity = item.product.stock;
      this.notificationService.showWarning(`Solo hay ${item.product.stock} unidades disponibles.`);
    }
    
    this.cartService.updateQuantity(item.product.id, item.quantity);
    this.calculateTotal();
  }
  
  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id);
    this.notificationService.showInfo(`${item.product.name} eliminado del carrito.`);
  }
  
  calculateTotal(): void {
    this.cartTotal = this.cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity), 
      0
    );
  }
  
  checkout(): void {
    if (this.cartItems.length === 0) {
      this.notificationService.showWarning('Su carrito está vacío');
      return;
    }
    
    this.router.navigate(['/checkout']);
  }
}