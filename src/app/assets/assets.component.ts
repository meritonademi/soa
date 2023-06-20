import { Component } from '@angular/core';
import { assets } from '../models/assets';
import { AssetsService } from '../services/assets.service';

@Component({
  selector: 'app-asset',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent {
  assets: assets[] = [];
  newAsset: assets = { id: 0, name: '', serialNr: '', categoryId: 0, category: { name: '', id: 0 } };
  selectedAsset: assets | null = null;
  isCreateModalVisible = false;
  isEditModalVisible = false;
  isDeleteModalVisible = false;

  constructor(private assetService: AssetsService) { }

  ngOnInit() {
    this.getAssets();
  }

  getAssets(): void {
    this.assetService.getAssets().subscribe((assets: assets[]) => this.assets = assets);
  }

  createAsset(): void {
    this.assetService.addAssets(this.newAsset).subscribe((assets: assets) => {
      this.assets.push(assets);
      this.newAsset = { id: 0, name: '', serialNr: '', categoryId: 0, category: { name: '', id: 0 } };
      this.isCreateModalVisible = false;
    });
  }

  updateAsset(): void {
    if (this.selectedAsset) {
      this.assetService.updateAssets(this.selectedAsset).subscribe(() => {
        const index = this.assets.findIndex((asset: assets) => asset.id === this.selectedAsset!.id);
        if (index >= 0) {
          this.assets[index] = this.selectedAsset!;
          this.selectedAsset = null;
          this.isEditModalVisible = false;
        }
      });
    }
  }

  deleteAsset(): void {
    const asset: assets | null = this.selectedAsset;
    if (asset && asset.id != null) {
      this.assetService.deleteAssets(asset).subscribe(() => {
        this.assets = this.assets.filter((a: assets) => a.id !== asset.id);
        if (this.selectedAsset === asset) {
          this.selectedAsset = null;
        }
        this.isDeleteModalVisible = false;
      });
    } else {
      console.log('No asset selected.');
    }
  }

  openCreateModal(): void {
    this.newAsset = { id: 0, name: '', serialNr: '', categoryId: 0, category: { name: '', id: 0 } };
    this.isCreateModalVisible = true;
  }

  openEditModal(asset: assets): void {
    this.selectedAsset = Object.assign({}, asset);
    this.isEditModalVisible = true;
  }

  openDeleteModal(asset: assets): void {
    this.selectedAsset = asset;
    this.isDeleteModalVisible = true;
  }

  cancelUpdate(): void {
    this.selectedAsset = null;
    this.isEditModalVisible = false;
  }

  cancelCreate(): void { this.selectedAsset = null;
    this.isCreateModalVisible = false;
  }

  cancelDelete(): void {
    this.selectedAsset = null;
    this.isDeleteModalVisible = false;
  }
}
