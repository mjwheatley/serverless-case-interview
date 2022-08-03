import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../services';
import { Storage } from 'aws-amplify';
import { StoragePutResponse } from '../../models';
import { APIService } from '../../API.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss']
})
export class InventoryPage implements OnInit {
  @ViewChild('hiddenFileInput') hiddenFileInput;
  public items: any;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
    private apiService: APIService
  ) {
  }

  async ngOnInit() {
    const { items } = await this.apiService.ListInventories();
    this.setItems(items);
    this.apiService.OnCreateInventoryListener.subscribe((evt) => {
      const item = (evt as any).value.data.onCreateInventory;
      this.setItems([...this.items, item]);
    });
  }

  public async navigate(item: any) {
    await this.router.navigateByUrl(`inventory/inventory-info/${item.id}`, { state: item });
  }

  public selectFile() {
    this.hiddenFileInput.nativeElement.value = ``;
    this.hiddenFileInput.nativeElement.click();
  }

  public async fileInputChangeListener($event) {
    this.loadingService.setIsLoading(true);
    const file: File = $event.target.files[0];
    const key = `inventory/${file.name}`;
    try {
      const storageResponse = await Storage.put(key,
        file, {
          contentType: 'image/csv',
          progressCallback: (progress: any) => {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          }
        }) as StoragePutResponse;
      this.loadingService.setIsLoading(false);
      if (storageResponse && storageResponse.key) {
        const alert = await this.alertCtrl.create({
          header: `Upload Success`,
          message: `Successfully uploaded file`,
          buttons: [{
            text: `OK`
          }]
        });
        await alert.present();
      }
    } catch (error) {
      this.loadingService.setIsLoading(false);
      console.error('Error uploading file', error);
      const alert = await this.alertCtrl.create({
        header: `Upload Error`,
        message: error.message,
        buttons: [{
          text: `OK`
        }]
      });
      await alert.present();
    }
  }

  private setItems(items: any[]) {
    this.items = items.sort((a, b) => {
      if (a.productId > b.productId) {
        return 1;
      } else if (a.productId < b.productId) {
        return -1;
      }

      // Else go to the 2nd item
      if (a.warehouseId < b.warehouseId) {
        return -1;
      } else if (a.warehouseId > b.warehouseId) {
        return 1;
      } else { // nothing to split them
        return 0;
      }
    });
  }
}
