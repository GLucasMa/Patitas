import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, PaginationComponent],
  template: `
    <div class="product-list-page">
      <div class="container">
        <header class="page-header">
          <h1>Nuestros Productos</h1>
          <p>Encuentra los mejores alimentos para tus mascotas</p>
        </header>
        
        <div class="filters-container">
          <div class="search-box">
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              (keyup.enter)="applyFilters()"
              placeholder="Buscar productos..." 
              class="form-control"
            >
            <button class="search-btn" (click)="applyFilters()">
              <span class="material-icons">search</span>
            </button>
          </div>
          
          <div class="category-filter">
            <select [(ngModel)]="selectedCategory" (change)="applyFilters()" class="form-control">
              <option value="">Todas las categorías</option>
              <option *ngFor="let category of categories" [value]="category.value">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="products-container">
          <div class="spinner" *ngIf="isLoading"></div>
          
          <div class="products-grid" *ngIf="!isLoading && products.length > 0">
            <div class="product-item" *ngFor="let product of products">
              <app-product-card [product]="product"></app-product-card>
            </div>
          </div>
          
          <div class="no-results" *ngIf="!isLoading && products.length === 0">
            <p>No se encontraron productos que coincidan con los criterios de búsqueda.</p>
            <button class="btn btn-primary" (click)="resetFilters()">Restablecer filtros</button>
          </div>
        </div>
        
        <app-pagination 
          *ngIf="totalPages > 1"
          [currentPage]="currentPage" 
          [totalPages]="totalPages"
          (pageChanged)="onPageChange($event)"
        ></app-pagination>
      </div>
    </div>
  `,
  styles: [`
    .product-list-page {
      padding: 24px 0 48px;
    }
    
    .page-header {
      text-align: center;
      margin-bottom: 32px;
    }
    
    .page-header h1 {
      font-size: 36px;
      margin-bottom: 8px;
      color: var(--text-primary);
    }
    
    .page-header p {
      font-size: 18px;
      color: var(--text-secondary);
    }
    
    .filters-container {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
    }
    
    .search-box {
      flex: 1;
      position: relative;
    }
    
    .search-btn {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
    }
    
    .category-filter {
      width: 200px;
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    
    .no-results {
      text-align: center;
      padding: 48px 0;
    }
    
    .no-results p {
      margin-bottom: 16px;
      font-size: 18px;
      color: var(--text-secondary);
    }
    
    @media (max-width: 768px) {
      .filters-container {
        flex-direction: column;
      }
      
      .category-filter {
        width: 100%;
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  searchQuery = '';
  selectedCategory = '';
  
  // Pagination
  currentPage = 1;
  pageSize = 12;
  totalItems = 0;
  totalPages = 0;
  
  categories = [
    { name: 'Perros', value: 'perros' },
    { name: 'Gatos', value: 'gatos' },
    { name: 'Aves', value: 'aves' },
    { name: 'Peces', value: 'peces' },
    { name: 'Roedores', value: 'roedores' }
  ];
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedCategory = params['category'] || '';
      this.currentPage = params['page'] ? parseInt(params['page'], 10) : 1;
      
      this.loadProducts();
    });
  }
  
  loadProducts(): void {
    this.isLoading = true;
    
    const params = {
      page: this.currentPage,
      limit: this.pageSize
    } as any;
    
    if (this.searchQuery) {
      params.search = this.searchQuery;
    }
    
    if (this.selectedCategory) {
      params.category = this.selectedCategory;
    }
    
    this.productService.getProducts(params).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalItems = response.total;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products', error);
        this.isLoading = false;
      }
    });
  }
  
  applyFilters(): void {
    const queryParams = {} as any;
    
    if (this.searchQuery) {
      queryParams.search = this.searchQuery;
    }
    
    if (this.selectedCategory) {
      queryParams.category = this.selectedCategory;
    }
    
    // Reset to first page when filters change
    queryParams.page = 1;
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
  
  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }
  
  onPageChange(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}