import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { form, required, minLength, FormField } from '@angular/forms/signals';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginModel = signal({
    username: '',
    password: ''
  });

  progress = signal(false);
  errorMessage = signal('');

  loginForm = form(this.loginModel, (path) => {
    required(path.username, { message: 'Username is required' });
    minLength(path.username, 3, { message: 'Username must be at least 3 characters long' });
    required(path.password, { message: 'Password is required' });
  });

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  handleLoginClick() {
    if (this.loginForm().invalid()) {
      return;
    }

    this.progress.set(true);
    this.errorMessage.set('');

    const credentials = this.loginModel();
    this.authService.login(credentials.username, credentials.password).subscribe({
      next: (user) => {
        this.progress.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed in component:', err);
        this.errorMessage.set(err.error?.message || 'Invalid username or password. Try siva / Siva@0990');
        this.progress.set(false);
      }
    });
  }
}
