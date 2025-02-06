import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollecteModel } from '../store/collecte/collecte.model';

@Injectable({
  providedIn: 'root'
})
export class CollecteService {
  private apiUrl = 'http://localhost:3000/collectes';

  constructor(private http: HttpClient) {}

  getCollectes(): Observable<CollecteModel[]> {
    return this.http.get<CollecteModel[]>(this.apiUrl);
  }

  addCollecte(collecte: CollecteModel): Observable<CollecteModel> {
    return this.http.post<CollecteModel>(this.apiUrl, collecte);
  }

  updateCollecte(collecte: CollecteModel): Observable<CollecteModel> {
    return this.http.put<CollecteModel>(`${this.apiUrl}/${collecte.id}`, collecte);
  }

  deleteCollecte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
