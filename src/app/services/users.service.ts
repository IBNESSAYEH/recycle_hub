import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl: string = 'http://localhost:3000/users';
  http = inject(HttpClient);

  getCurrentUserFromStorage(): UserData | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
  getCurrentUserSync(): UserData | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
  deleteAccount(id: string): Observable<UserData[]> {
    return this.http.delete<UserData[]>(`${this.apiUrl}/${id}`);
  }

}
