import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

interface User {
  id?: number;
  email: string;
  password: string;
  role: string;
}

interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  getToken(): string | null {
    const user = this.getCurrentUser();
    if (user && user.id) {
      return user.id.toString();
    }
    return null;
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${credentials.email}`).pipe(
      map((users: User[]) => {
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
        throw new Error('Invalid credentials');
      }),
      catchError(this.handleError)
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
