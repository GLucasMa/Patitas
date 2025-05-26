import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NotificationComponent
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
      <app-footer></app-footer>
      
      <app-notification *ngIf="showNotification" 
      [message]="notificationMessage" 
      [type]="notificationType" 
      (close)="closeNotification()">
      </app-notification>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
      padding: 24px 0;
    }
  `]
})
export class AppComponent {
  showNotification = false;
  notificationMessage = '';
  notificationType: 'error' | 'success' | 'info' | 'warning' = 'success';

  
  constructor(private notificationService: NotificationService) {
    this.notificationService.notification$.subscribe(notification => {
      if (notification) {
        this.showNotification = true;
        this.notificationMessage = notification.message;
        this.notificationType = notification.type;
        
        // Auto-hide notification after 5 seconds
        setTimeout(() => {
          this.closeNotification();
        }, 5000);
      }
    });
  }
  
  closeNotification() {
    this.showNotification = false;
  }
}