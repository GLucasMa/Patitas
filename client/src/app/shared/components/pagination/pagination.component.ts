import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination" *ngIf="totalPages > 1">
      <button 
        class="pagination-btn" 
        [disabled]="currentPage === 1"
        (click)="pageChanged.emit(currentPage - 1)"
      >
        <span class="material-icons">chevron_left</span>
      </button>
      
      <ng-container *ngFor="let page of getPageNumbers()">
        <span *ngIf="page === '...'" class="pagination-ellipsis">...</span>
        <button 
          *ngIf="page !== '...'"
          class="pagination-btn" 
          [class.active]="page === currentPage"
          (click)="pageChanged.emit(+page)"
        >
          {{ page }}
        </button>
      </ng-container>
      
      <button 
        class="pagination-btn" 
        [disabled]="currentPage === totalPages"
        (click)="pageChanged.emit(currentPage + 1)"
      >
        <span class="material-icons">chevron_right</span>
      </button>
    </div>
  `,
  styles: [`
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 24px 0;
    }
    
    .pagination-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 4px;
      margin: 0 4px;
      background-color: var(--background-light);
      border: 1px solid var(--border-color);
      cursor: pointer;
    }
    
    .pagination-btn.active {
      background-color: var(--primary-color);
      color: var(--text-light);
      border-color: var(--primary-color);
    }
    
    .pagination-btn:hover:not(:disabled):not(.active) {
      background-color: var(--background-grey);
    }
    
    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .pagination-ellipsis {
      margin: 0 4px;
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChanged = new EventEmitter<number>();
  
  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    
    if (this.totalPages <= 7) {
      // Show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      pages.push(1);
      
      if (this.currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (this.currentPage < this.totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(this.totalPages);
    }
    
    return pages;
  }
}