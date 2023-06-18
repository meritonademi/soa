import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Department} from './models/department';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-managment-system';
  tasks: Department[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    this.http.get<Department[]>('https://localhost:7105/api/departments').subscribe((data: Department[]) => {
      this.tasks = data;
    });
  }

}
