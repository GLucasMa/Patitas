import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Patitas<span>Tienda</span></h3>
            <p>Tu tienda online de alimentos balanceados para mascotas. Calidad y variedad para el cuidado de tus animales.</p>
          </div>
          
          <div class="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><a routerLink="/">Inicio</a></li>
              <li><a routerLink="/products">Productos</a></li>
              <li><a routerLink="/profile">Mi Cuenta</a></li>
              <li><a routerLink="/profile/orders">Mis Pedidos</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Contacto</h4>
            <p>¡Tienda a estrenar!</p>
            <p>Villa Carlos Paz, Cordoba</p>
            <p>PatitasTiendaMascotas&#64;gmail.com</p>
            <p>+54 3541 575357</p>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Patitas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background-color: var(--primary-dark);
      color: var(--text-light);
      padding: 48px 0 24px;
      margin-top: 48px;
    }
    
    .footer-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 24px;
    }
    
    .footer-section {
      flex: 1;
      min-width: 200px;
    }
    
    .footer-section h3 {
      font-size: 24px;
      margin-bottom: 16px;
      color: var(--background-light);
    }
    
    .footer-section h3 span {
      color: var(--secondary-color);
    }
    
    .footer-section h4 {
      font-size: 18px;
      margin-bottom: 16px;
      color: var(--background-light);
    }
    
    .footer-section p {
      margin-bottom: 8px;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .footer-section ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-section ul li {
      margin-bottom: 8px;
    }
    
    .footer-section ul li a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .footer-section ul li a:hover {
      color: var(--background-light);
    }
    
    .footer-bottom {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
    }
    
    .footer-bottom p {
      color: rgba(255, 255, 255, 0.6);
    }
    
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}