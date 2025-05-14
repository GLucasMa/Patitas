import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container" [ngClass]="type">
      <div class="notification-content">
        <span class="material-icons notification-icon">
          {{ getIcon() }}
        </span>
        <p class="notification-message">{{ message }}</p>
      </div>
      <button class="notification-close" (click)="close.emit()">
        <span class="material-icons">close</span>
      </button>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background-color: var(--background-light);
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 300px;
      max-width: 500px;
      padding: 16px;
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
      border-left: 4px solid;
    }
    
    .notification-content {
      display: flex;
      align-items: center;
    }
    
    .notification-icon {
      margin-right: 12px;
    }
    
    .notification-message {
      margin: 0;
    }
    
    .notification-close {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-secondary);
      padding: 0;
      margin-left: 16px;
    }
    
    /* Notification types */
    .success {
      border-left-color: var(--success-color);
    }
    
    .success .notification-icon {
      color: var(--success-color);
    }
    
    .error {
      border-left-color: var(--error-color);
    }
    
    .error .notification-icon {
      color: var(--error-color);
    }
    
    .info {
      border-left-color: var(--primary-color);
    }
    
    .info .notification-icon {
      color: var(--primary-color);
    }
    
    .warning {
      border-left-color: var(--warning-color);
    }
    
    .warning .notification-icon {
      color: var(--warning-color);
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class NotificationComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Output() close = new EventEmitter<void>();
  
  getIcon(): string {
    switch (this.type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info':
      default: return 'info';
    }
  }
}