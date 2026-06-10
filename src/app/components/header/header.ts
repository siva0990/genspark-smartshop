import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  currentUser = signal<any>(null);
  private sub: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router) {}

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

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
