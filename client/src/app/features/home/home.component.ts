import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <div class="home-page">
      <!-- Hero Banner -->
      <section class="hero-banner">
        <div class="container">
          <div class="hero-content">
            <h1>Alimentos premium para tu mascota</h1>
            <p>Encuentra los mejores productos para el cuidado y la alimentación de tus compañeros de vida.</p>
            <a routerLink="/products" class="btn btn-primary">Ver Productos</a>
          </div>
        </div>
      </section>
      
      <!-- Featured Products -->
      <section class="featured-products">
        <div class="container">
          <div class="section-header">
            <h2>Productos Destacados</h2>
            <a routerLink="/products" class="view-all">Ver todos</a>
          </div>
          
          <div class="products-grid" *ngIf="featuredProducts.length > 0">
            <div class="product-item" *ngFor="let product of featuredProducts">
              <app-product-card [product]="product"></app-product-card>
            </div>
          </div>
          
          <div class="spinner" *ngIf="isLoading"></div>
          
          <div class="no-products" *ngIf="!isLoading && featuredProducts.length === 0">
            <p>No hay productos destacados disponibles en este momento.</p>
          </div>
        </div>
      </section>
      
      <!-- Categories -->
      <section class="categories">
        <div class="container">
          <h2>Categorías</h2>
          
          <div class="categories-grid">
            <div class="category-card" *ngFor="let category of categories">
              <div class="category-image">
                <img [src]="category.image" [alt]="category.name">
              </div>
              <h3>{{ category.name }}</h3>
              <a [routerLink]="['/products']" [queryParams]="{category: category.value}" class="btn btn-outline">Ver Productos</a>
            </div>
          </div>
        </div>
      </section>
      
      <!-- About Us Section -->
      <section class="about-us">
        <div class="container">
          <div class="about-content">
            <div class="about-text">
              <h2>Sobre Nosotros</h2>
              <p>En Patitas estamos comprometidos con la salud y bienestar de tus mascotas. Ofrecemos una amplia variedad de alimentos balanceados de la más alta calidad, formulados para cubrir las necesidades nutricionales específicas de cada etapa de vida.</p>
              <p>Nuestro equipo de expertos selecciona cuidadosamente cada producto, garantizando los más altos estándares de calidad y frescura.</p>
            </div>
            <div class="about-image">
              <img src="https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Sobre Nosotros">
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-banner {
      background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("../../../assets/foto1.jpg");
      background-size: cover;
      height: 600px;
      display: flex;
      align-items: center;
      color: var(--text-light);
      position: relative;
    }
  
    .hero-content {
      max-width: 600px;
    }
    
    .hero-content h1 {
      font-size: 48px;
      margin-bottom: 16px;
      font-weight: 700;
    }
    
    .hero-content p {
      font-size: 20px;
      margin-bottom: 32px;
      opacity: 0.9;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }
    
    .section-header h2 {
      font-size: 32px;
      color: var(--text-primary);
    }
    
    .view-all {
      color: var(--primary-color);
      font-weight: 500;
      text-decoration: none;
    }
    
    .view-all:hover {
      text-decoration: underline;
    }
    
    .featured-products {
      padding: 64px 0;
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    
    .categories {
      padding: 64px 0;
      background-color: var(--background-grey);
    }
    
    .categories h2 {
      text-align: center;
      margin-bottom: 32px;
      font-size: 32px;
    }
    
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 24px;
    }
    
    .category-card {
      background-color: var(--background-light);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      text-align: center;
      padding-bottom: 16px;
    }
    
    .category-card:hover {
      transform: translateY(-4px);
    }
    
    .category-image {
      height: 160px;
      overflow: hidden;
    }
    
    .category-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .category-card:hover .category-image img {
      transform: scale(1.05);
    }
    
    .category-card h3 {
      margin: 16px 0;
      font-size: 18px;
    }
    
    .about-us {
      padding: 64px 0;
    }
    
    .about-content {
      display: flex;
      align-items: center;
      gap: 48px;
    }
    
    .about-text {
      flex: 1;
    }
    
    .about-text h2 {
      font-size: 32px;
      margin-bottom: 24px;
    }
    
    .about-text p {
      margin-bottom: 16px;
      font-size: 16px;
      line-height: 1.6;
    }
    
    .about-image {
      flex: 1;
    }
    
    .about-image img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    .no-products {
      text-align: center;
      padding: 32px;
      background-color: var(--background-grey);
      border-radius: 8px;
    }
    
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 36px;
      }
      
      .about-content {
        flex-direction: column;
      }
      
      .about-image {
        order: -1;
        margin-bottom: 24px;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  isLoading = true;
  
  categories = [
    { 
      name: 'Perros', 
      value: 'perros', 
      image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
    { 
      name: 'Gatos', 
      value: 'gatos', 
      image: 'https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
    { 
      name: 'Aves', 
      value: 'aves', 
      image: 'https://images.pexels.com/photos/1418241/pexels-photo-1418241.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
    { 
      name: 'Peces', 
      value: 'peces', 
      image: 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=600' 
    }
  ];
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.loadFeaturedProducts();
  }
  
  loadFeaturedProducts(): void {
    this.isLoading = true;
    this.productService.getProducts({ limit: 4 }).subscribe({
      next: (response) => {
        this.featuredProducts = response.products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading featured products', error);
        this.isLoading = false;
      }
    });
  }
}