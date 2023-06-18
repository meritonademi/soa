import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from './task';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-managment-system';
  tasks: Task[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    this.http.get<Task[]>('https://localhost:7053/api/task').subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

}
