import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { CollecteModel } from '../store/collecte/collecte.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CollecteService {
  private apiUrl = 'http://localhost:3000/collectes';

  constructor(private http: HttpClient) {}
  private usersService = inject(UsersService);

  getCollectes(): Observable<CollecteModel[]> {
    return this.http.get<CollecteModel[]>(this.apiUrl);
  }

  addCollecte(collecte: CollecteModel): Observable<CollecteModel> {
    return this.http.post<CollecteModel>(this.apiUrl, collecte);
  }
  updateCollecte(collecte: CollecteModel): Observable<CollecteModel> {
    return this.http.put<CollecteModel>(`${this.apiUrl}/${collecte.id}`, collecte);
  }
  deleteCollectes(wasteType?: 'PLASTIC' | 'GLASS' ): Observable<CollecteModel[]> {
    return this.http.get<CollecteModel[]>(this.apiUrl).pipe(map(collectes => {
        if (wasteType) {return collectes.filter(collecte => collecte.wasteType === wasteType);
        }return collectes;})
    );
  }
  deleteCollecte(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



  getCollecteById(id: string): Observable<CollecteModel> {
    return this.http.get<CollecteModel>(`${this.apiUrl}/${id}`);
  }





  private calculatePoints(wasteType: 'PLASTIC' | 'GLASS' | 'PAPER' | 'METAL', weight: number): number {
    const pointsPerKg: Record<'PLASTIC' | 'GLASS' | 'PAPER' | 'METAL', number> = {
      'PLASTIC': 2,
      'GLASS': 1,
      'PAPER': 1,
      'METAL': 5
    };
    return Math.floor(weight * pointsPerKg[wasteType]);
  }

  updateCollectStatus(id: string, status: 'pending' | 'accepted' | 'completed' | 'cancelled'): Observable<CollecteModel> {

    return this.http.get<CollecteModel>(`${this.apiUrl}/${id}`).pipe(
      switchMap(collecte => {
        return this.http.patch<CollecteModel>(`${this.apiUrl}/${id}`, { status }).pipe(
          switchMap(updatedCollecte => {
            if (status === 'completed') {
              const currentUser = this.usersService.getCurrentUserFromStorage();
              if (currentUser) {
                const earnedPoints = this.calculatePoints(collecte.wasteType, collecte.estimatedWeight);
                const updatedUserData = {
                  ...currentUser,
                  point: (currentUser.point || 0) + earnedPoints
                };

                return this.usersService.updateUser(currentUser.id, updatedUserData).pipe(
                  map(() => {
                    localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
                    return updatedCollecte;
                  })
                );
              }
            }
            return new Observable<CollecteModel>(observer => observer.next(updatedCollecte));
          })
        );
      })
    );
  }
}
