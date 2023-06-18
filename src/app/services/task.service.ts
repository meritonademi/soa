import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from './../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = 'https://localhost:7105/api/Task';

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  deleteTask(task: Task): Observable<void> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<void>(url);
  }

  updateTask(task: Task): Observable<void> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<void>(url, task);
  }
}
