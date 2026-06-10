import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        this.currentUserSubject.next(JSON.parse(storedUser));
      } catch (e) {
        this.currentUserSubject.next(null);
      }
    }
  }

  login(username: string, password: string): Observable<any> {
    if (username === 'siva' && password === 'Siva@0990') {
      const mockUser = {
        id: 999,
        username: 'siva',
        email: 'sivasabarip29990@gmail.com',
        firstName: 'Siva',
        lastName: 'Sabari',
        gender: 'male',
        image: 'https://dummyjson.com/icon/siva/128',
        token: 'mock-token-siva-0990'
      };
      sessionStorage.setItem('token', mockUser.token);
      sessionStorage.setItem('user', JSON.stringify(mockUser));
      this.currentUserSubject.next(mockUser);
      return of(mockUser);
    }

    return this.http.post<any>('https://dummyjson.com/auth/login', { username, password })
      .pipe(
        tap(user => {
          sessionStorage.setItem('token', user.accessToken || user.token);
          sessionStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(error => {
          console.error('Login error in AuthService:', error);
          return throwError(() => error);
        })
      );
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token') && this.currentUserSubject.value !== null;
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}
