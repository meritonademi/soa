import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { TaskManagerComponent } from './task-management/task-manager.component';
import {FormsModule} from "@angular/forms";
import { DepartmentComponent } from './department/department.component';
import { CategoryComponent } from './category/category.component';
import { EmployeeComponent } from './employee/employee.component';
import { AssetsComponent } from './assets/assets.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskManagerComponent,
    DepartmentComponent,
    CategoryComponent,
    EmployeeComponent,
    AssetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
