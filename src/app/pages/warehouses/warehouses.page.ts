import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from 'aws-amplify';
import { StoragePutResponse } from '../../models';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../services';
import { APIService } from '../../API.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.page.html',
  styleUrls: ['./warehouses.page.scss']
})
export class WarehousesPage implements OnInit {
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
    const { items } = await this.apiService.ListWarehouses();
    this.setItems(items);
    this.apiService.OnCreateWarehouseListener.subscribe((evt) => {
      const item = (evt as any).value.data.onCreateWarehouse;
      this.setItems([...this.items, item]);
    });
  }

  public async navigate(item: any) {
    await this.router.navigateByUrl(`warehouses/warehouse/${item.id}`, { state: item });
  }

  public selectFile() {
    this.hiddenFileInput.nativeElement.value = ``;
    this.hiddenFileInput.nativeElement.click();
  }

  public async fileInputChangeListener($event) {
    this.loadingService.setIsLoading(true);
    const file: File = $event.target.files[0];
    const key = `warehouses/${file.name}`;
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
    this.items = items.sort((a, b) =>
      a.warehouseId > b.warehouseId ? 1 :
        a.warehouseId < b.warehouseId ? -1 : 0
    );
  }
}
