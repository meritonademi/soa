import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent {
  tasks: Task[] = [];
  newTask: Task = {name: '', description: '', deadline: new Date(), isCompleted: false}
  selectedTask: Task | null = null;
  isCreateModalVisible = false;
  isEditModalVisible = false;
  isDeleteModalVisible = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => this.tasks = tasks);
  }

  createTask(): void {
    this.taskService.addTask(this.newTask).subscribe((task: Task) => {
      this.tasks.push(task);
      this.newTask = {name: '', description: '', deadline: new Date(), isCompleted: false}
      this.isCreateModalVisible = false;
    });
  }

  updateTask(): void {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask).subscribe(() => {
        const index = this.tasks.findIndex((task:Task) => task.id === this.selectedTask!.id);
        if (index >= 0) {
          this.tasks[index] = this.selectedTask!;
          this.selectedTask = null;
          this.isEditModalVisible = false;
        }
      });
    }
  }


  deleteTask(): void {
    const task: Task | null = this.selectedTask;
    if (task && task.id != null) {
      this.taskService.deleteTask(task).subscribe(() => {
        this.tasks = this.tasks.filter((t:Task) => t.id !== task.id);
        if (this.selectedTask === task) {
          this.selectedTask = null;
        }
        this.isDeleteModalVisible = false;
      });
    } else {
      console.log('No task selected.');
    }
  }

  openCreateModal(): void {
    this.newTask = {name: '', description: '', deadline: new Date(), isCompleted: false}
    this.isCreateModalVisible = true;
    console.log(this.isCreateModalVisible)
  }

  openEditModal(task: Task): void {
    this.selectedTask = Object.assign({}, task);
    this.isEditModalVisible = true;
  }

  openDeleteModal(task: Task): void {
    this.selectedTask = task;
    this.isDeleteModalVisible = true;
  }

  cancelUpdate(): void {
    this.selectedTask = null;
    this.isEditModalVisible = false;
  }

  cancelCreate(): void {
    this.selectedTask = null;
    this.isCreateModalVisible = false;
  }


  cancelDelete(): void {
    this.selectedTask = null;
    this.isDeleteModalVisible = false;
  }
}
