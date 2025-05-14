import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product, ProductCreateDto, ProductUpdateDto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = '/api/products';
  
  constructor(private http: HttpClient) {}
  
  getProducts(params?: { 
    category?: string, 
    search?: string, 
    page?: number, 
    limit?: number 
  }): Observable<{ products: Product[], total: number }> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    
    return this.http.get<{ products: Product[], total: number }>(
      this.API_URL, 
      { params: httpParams }
    );
  }
  
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }
  
  createProduct(product: ProductCreateDto): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product);
  }
  
  updateProduct(id: number, product: ProductUpdateDto): Observable<Product> {
    return this.http.patch<Product>(`${this.API_URL}/${id}`, product);
  }
  
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}