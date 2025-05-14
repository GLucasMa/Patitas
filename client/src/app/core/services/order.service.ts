import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order, CreateOrderDto } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly API_URL = '/api/orders';
  
  constructor(private http: HttpClient) {}
  
  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API_URL}/user`);
  }
  
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.API_URL}/${id}`);
  }
  
  createOrder(orderData: CreateOrderDto): Observable<Order> {
    return this.http.post<Order>(this.API_URL, orderData);
  }
  
  // Admin methods
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API_URL);
  }
  
  updateOrderStatus(id: number, status: string): Observable<Order> {
    return this.http.patch<Order>(`${this.API_URL}/${id}/status`, { status });
  }
}