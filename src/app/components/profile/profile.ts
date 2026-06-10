import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit, OnDestroy {
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
