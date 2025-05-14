import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'shopping_cart';
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();
  
  constructor() {
    this.loadCart();
  }
  
  private loadCart(): void {
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (storedCart) {
      try {
        this.cartItems.next(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error loading cart from storage', error);
        this.cartItems.next([]);
      }
    }
  }
  
  private saveCart(): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems.value));
  }
  
  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartItems.value;
    const existingItemIndex = currentCart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Product already in cart, update quantity
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex].quantity += quantity;
      this.cartItems.next(updatedCart);
    } else {
      // Add new product to cart
      this.cartItems.next([...currentCart, { product, quantity }]);
    }
    
    this.saveCart();
  }
  
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    const currentCart = this.cartItems.value;
    const itemIndex = currentCart.findIndex(item => item.product.id === productId);
    
    if (itemIndex !== -1) {
      const updatedCart = [...currentCart];
      updatedCart[itemIndex].quantity = quantity;
      this.cartItems.next(updatedCart);
      this.saveCart();
    }
  }
  
  removeFromCart(productId: number): void {
    const updatedCart = this.cartItems.value.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedCart);
    this.saveCart();
  }
  
  clearCart(): void {
    this.cartItems.next([]);
    this.saveCart();
  }
  
  getCartTotalItems(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }
  
  getCartTotalPrice(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + (item.product.price * item.quantity), 
      0
    );
  }
}