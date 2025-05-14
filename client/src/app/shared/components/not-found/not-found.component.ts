import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <div class="container">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <a routerLink="/" class="btn btn-primary">Volver al Inicio</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 64px 16px;
      min-height: 60vh;
    }
    
    h1 {
      font-size: 120px;
      margin: 0;
      color: var(--primary-color);
      line-height: 1;
    }
    
    h2 {
      font-size: 32px;
      margin: 16px 0;
      color: var(--text-primary);
    }
    
    p {
      font-size: 18px;
      margin-bottom: 32px;
      color: var(--text-secondary);
      max-width: 600px;
    }
    
    .btn {
      padding: 12px 24px;
      font-size: 16px;
    }
  `]
})
export class NotFoundComponent {}