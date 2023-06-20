import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = 'https://localhost:7105/api/employee';

  constructor(private http: HttpClient) {
  }

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  deleteEmployee(employee: Employee): Observable<void> {
    const url = `${this.apiUrl}/${employee.id}`;
    return this.http.delete<void>(url);
  }

  updateEmployee(employee: Employee): Observable<void> {
    const url = `${this.apiUrl}/${employee.id}`;
    return this.http.put<void>(url, employee);
  }
}
