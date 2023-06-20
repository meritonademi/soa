import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Department} from './models/department';
import { Category } from './models/category';
import { Employee } from './models/employee';
import { assets } from './models/assets';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-managment-system';
  tasks: Department[] = [];
  categories : Category[] = [];
  employees : Employee[]=[];
  asset : assets[] =[];

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
   getTaskS() {
    this.http.get<Category[]>('https://localhost:7105/api/categories').subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  getEmployee() {
    this.http.get<Employee[]>('https://localhost:7105/api/employees').subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  getAsset() {
    this.http.get<assets[]>('https://localhost:7105/api/assetes').subscribe((data: assets[]) => {
      this.asset = data;
    });
  }

}
