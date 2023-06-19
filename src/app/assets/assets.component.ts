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
    isAddModalVisible = false;
    isDeleteModalVisible = false;

    constructor(private assetService: AssetsService) { }

    ngOnInit() {
        this.getassets();
    }

    getassets(): void {
        this.assetService.getAssets().subscribe((assets: assets[]) => this.assets = assets);
    }

    createAssets(): void {
        this.assetService.addAssets(this.newAsset).subscribe((assets: assets) => {
            this.assets.push(assets);
            this.newAsset = { id: 0, name: '', serialNr: '', categoryId: 0, category: { name: '', id: 0 } };
            this.isCreateModalVisible = false;
        });
    }

    updateAsset(): void {
        if (this.selectedAsset) {
            this.assetService.updateAssets(this.selectedAsset).subscribe(() => {
                const index = this.assets.findIndex((assets: assets) => assets.id === this.selectedAsset!.id);
                if (index >= 0) {
                    this.assets[index] = this.selectedAsset!;
                    this.selectedAsset = null;
                    this.isEditModalVisible = false;
                }
            });
        }
    }


    deleteAsset(): void {
        const assets: assets | null = this.selectedAsset;
        if (assets && assets.id != null) {
            this.assetService.deleteAssets(this.newAsset).subscribe(() => {
                this.assets = this.assets.filter((assets: assets) => assets.id !== assets.id);
                if (this.selectedAsset === assets) {
                    this.selectedAsset = null;
                }
                this.isDeleteModalVisible = false;
            });
        } else {
            console.log('No asset selected.');
        }
    }

    openCreateModal(): void {
        this.assets = { id: 0, name: '', serialNr: '', categoryId: 0, category: { name: '', id: 0 } };
        this.isCreateModalVisible = true;
        console.log(this.isCreateModalVisible);
    }

    openEditModal(assets: assets): void {
        this.selectedAsset = Object.assign({}, assets);
        this.isEditModalVisible = true;
    }

    openDeleteModal(assets: assets): void {
        this.selectedAsset = assets;
        this.isDeleteModalVisible = true;
    }

    cancelUpdate(): void {
        this.selectedAsset = null;
        this.isEditModalVisible = false;
    }

    cancelCreate(): void {
        this.selectedAsset = null;
        this.isCreateModalVisible = false;
    }


    cancelDelete(): void {
        this.selectedAsset = null;
        this.isDeleteModalVisible = false;
    }
}


