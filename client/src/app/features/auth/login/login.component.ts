import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  returnUrl: string = '/';
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
    // Get return url from route parameters
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  // Getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    
    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    
    this.authService.login({
      email: this.f['email'].value,
      password: this.f['password'].value
    }).subscribe({
      next: () => {
        this.notificationService.showSuccess('¡Inicio de sesión exitoso!');
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        console.error('Login error', error);
        this.isLoading = false;
      }
    });
  }
}