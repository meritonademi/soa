import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '../models/department';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  apiUrl = 'https://localhost:7105/api/departments';

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  deleteDepartment(department: Department): Observable<void> {
    const url = `${this.apiUrl}/${department.id}`;
    return this.http.delete<void>(url);
  }

  updateDepartment(department: Department): Observable<void> {
    const url = `${this.apiUrl}/${department.id}`;
    return this.http.put<void>(url, department);
  }
}
