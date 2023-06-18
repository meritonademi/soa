import { Component } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category: Category[] = [];
  newCategory: Category = {name: ''}
  selectedCategory: Category | null = null;
  isCreateModalVisible = false;
  isEditModalVisible = false;
  isDeleteModalVisible = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => this.category = categories);
  }

  createCategory(): void {
    this.categoryService.addCategory(this.newCategory).subscribe((categories: Category) => {
      this.category.push(categories);
      this.newCategory = {name: '' }
      this.isCreateModalVisible = false;
    });
  }

  updateCategory(): void {
    if (this.selectedCategory) {
      this.categoryService.updateCategory(this.selectedCategory).subscribe(() => {
        const index = this.category.findIndex((categories: Category) => categories.id === this.selectedCategory!.id);
        if (index >= 0) {
          this.category[index] = this.selectedCategory!;
          this.selectedCategory = null;
          this.isEditModalVisible = false;
        }
      });
    }
  }


  deleteCategory(): void {
    const categories: Category | null = this.selectedCategory;
    if (categories && categories.id != null) {
      this.categoryService.deleteCategory(categories).subscribe(() => {
        this.category = this.category.filter((c:Category) => c.id !== categories.id);
        if (this.selectedCategory === categories) {
          this.selectedCategory = null;
        }
        this.isDeleteModalVisible = false;
      });
    } else {
      console.log('No Category selected.');
    }
  }

  openCreateModal(): void {
    this.newCategory = {name: ''}
    this.isCreateModalVisible = true;
    console.log(this.isCreateModalVisible)
  }

  openEditModal(category: Category): void {
    this.selectedCategory = Object.assign({}, category);
    this.isEditModalVisible = true;
  }

  openDeleteModal(category: Category): void {
    this.selectedCategory= category;
    this.isDeleteModalVisible = true;
  }

  cancelUpdate(): void {
    this.selectedCategory = null;
    this.isEditModalVisible = false;
  }

  cancelCreate(): void {
    this.selectedCategory = null;
    this.isCreateModalVisible = false;
  }


  cancelDelete(): void {
    this.selectedCategory = null;
    this.isDeleteModalVisible = false;
  }
}
