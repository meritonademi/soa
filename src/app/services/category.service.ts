import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:7105/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}`, category);
  }

  updateCategory(category: Category): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${category.id}`, category);
  }

  deleteCategory(category: Category): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${category.id}`);
  }
}
