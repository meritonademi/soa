import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { assets } from '../models/assets';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  addAsset(newAsset: assets) {
      throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://localhost:7105/api/assets';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<assets[]> {
    return this.http.get<assets[]>(`${this.apiUrl}`);
  }

  addAssets(assets: assets): Observable<assets> {
    return this.http.post<assets>(`${this.apiUrl}`, assets);
  }

  updateAssets(assets: assets): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${assets.id}`, assets);
  }

  deleteAssets(assets: assets): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${assets.id}`);
  }
}

