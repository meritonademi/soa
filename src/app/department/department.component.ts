import { Component } from '@angular/core';
import { Department } from '../models/department';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {

  department: Department[] = [];
  newDepartment: Department = {name: ''}
  selectedDepartment: Department | null = null;
  isCreateModalVisible = false;
  isEditModalVisible = false;
  isDeleteModalVisible = false;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.getDepartment();
  }

  getDepartment(): void {
    this.departmentService.getDepartments().subscribe((department: Department[]) => this.department = department);
  }

  createDepartments(): void {
    this.departmentService.addDepartment(this.newDepartment).subscribe((department: Department) => {
      this.department.push(department);
      this.newDepartment = {name: ''}
      this.isCreateModalVisible = false;
    });
  }

  updateDepartments(): void {
    if (this.selectedDepartment) {
      this.departmentService.updateDepartment(this.selectedDepartment).subscribe(() => {
        const index = this.department.findIndex((department:Department) =>department.id === this.selectedDepartment!.id);
        if (index >= 0) {
          this.department[index] = this.selectedDepartment!;
          this.selectedDepartment = null;
          this.isEditModalVisible = false;
        }
      });
    }
  }


  deleteDepartment(): void {
    const department: Department | null = this.selectedDepartment;
    if (department && department.id != null) {
      this.departmentService.deleteDepartment(department).subscribe(() => {
        this.department = this.department.filter((t:Department) => t.id !== department.id);
        if (this.selectedDepartment === department) {
          this.selectedDepartment = null;
        }
        this.isDeleteModalVisible = false;
      });
    } else {
      console.log('No department selected.');
    }
  }

  openCreateModal(): void {
    this.newDepartment = {name: ''}
    this.isCreateModalVisible = true;
    console.log(this.isCreateModalVisible)
  }

  openEditModal(department: Department): void {
    this.selectedDepartment = Object.assign({}, department);
    this.isEditModalVisible = true;
  }

  openDeleteModal(department: Department): void {
    this.selectedDepartment = department;
    this.isDeleteModalVisible = true;
  }

  cancelUpdate(): void {
    this.selectedDepartment = null;
    this.isEditModalVisible = false;
  }

  cancelCreate(): void {
    this.selectedDepartment = null;
    this.isCreateModalVisible = false;
  }


  cancelDelete(): void {
    this.selectedDepartment = null;
    this.isDeleteModalVisible = false;
  }
}

