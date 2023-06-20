import { Component } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  employee: Employee[] = [];
  newEmployee: Employee = {name: '', surname: '', tel: '', departmenId: 0, department:{ name:'', id:0}}
  selectedDepartment: Employee| null = null;
  isCreateModalVisible = false;
  isEditModalVisible = false;
  isDeleteModalVisible = false;
    selectedEmployee: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee(): void {
    this.employeeService.getEmployee().subscribe((employee: Employee[]) => this.employee = employee);
  }

  createEmployee(): void {
    this.employeeService.addEmployee(this.newEmployee).subscribe((employee: Employee) => {
      this.employee.push(employee);
      this.newEmployee = {name: '', surname: '', tel: '', departmenId: 0, department:{ name:'', id:0}}
      this.isCreateModalVisible = false;
    });
  }

  updateEmployee(): void {
    if (this.selectedEmployee) {
      this.employeeService.updateEmployee(this.selectedEmployee).subscribe(() => {
        const index = this.employee.findIndex((employee : Employee) =>employee.id === this.selectedEmployee!.id);
        if (index >= 0) {
          this.employee[index] = this.selectedEmployee!;
          this.selectedEmployee = null;
          this.isEditModalVisible = false;
        }
      });
    }
  }


  deleteEmployee(): void {
    const employee: Employee | null = this.selectedEmployee;
    if (employee && employee.id != null) {
      this.employeeService.deleteEmployee(employee).subscribe(() => {
        this.employee = this.employee.filter((t:Employee) => t.id !== employee.id);
        if (this.selectedEmployee === employee) {
          this.selectedEmployee = null;
        }
        this.isDeleteModalVisible = false;
      });
    } else {
      console.log('No employee selected.');
    }
  }

  openCreateModal(): void {
    this.newEmployee = {name: '', surname: '', tel: '', departmenId: 0, department:{ name:'', id:0}}
    this.isCreateModalVisible = true;
    console.log(this.isCreateModalVisible)
  }

  openEditModal(employee : Employee): void {
    this.selectedEmployee = Object.assign({}, employee);
    this.isEditModalVisible = true;
  }

  openDeleteModal(employee : Employee): void {
    this.selectedEmployee = employee;
    this.isDeleteModalVisible = true;
  }

  cancelUpdate(): void {
    this.selectedEmployee = null;
    this.isEditModalVisible = false;
  }

  cancelCreate(): void {
    this.selectedEmployee = null;
    this.isCreateModalVisible = false;
  }


  cancelDelete(): void {
    this.selectedEmployee = null;
    this.isDeleteModalVisible = false;
  }
}

