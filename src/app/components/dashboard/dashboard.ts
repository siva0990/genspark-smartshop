import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy {
  currentUser = signal<any>(null);
  private sub: Subscription | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.sub = this.authService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser.set(user);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
