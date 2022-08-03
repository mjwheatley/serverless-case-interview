import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../services';
import { Storage } from 'aws-amplify';
import { StoragePutResponse } from '../../models';
import { APIService } from '../../API.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss']
})
export class InventoryPage implements OnInit {
  @ViewChild('hiddenFileInput') hiddenFileInput;
  @ViewChild(MatSort) sort: MatSort;
  public items: any;
  public displayedColumns: string[] = ['warehouseId', 'productId', 'inventory', 'cost'];
  public dataSource: MatTableDataSource<any>;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
    private apiService: APIService,
    private liveAnnouncer: LiveAnnouncer,
    private changeDetectorRef: ChangeDetectorRef
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

  /** Announce the change in sort state for assistive technology. */
  public announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getTotalInventory() {
    return this.dataSource.filteredData.map(item => item.inventory).reduce((acc, value) => acc + value, 0);
  }

  public getTotalCost() {
    return this.dataSource.filteredData
      .map(item => item.inventory * item.product.cost)
      .reduce((acc, value) => acc + value, 0);
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
    this.dataSource = new MatTableDataSource(items);
    this.dataSource.filterPredicate = this.filterPredicate.bind(this);
    this.changeDetectorRef.detectChanges();
    this.dataSource.sort = this.sort;
  }

  private filterPredicate(data: any, filter: string): boolean {
    const propertyValues = Object.keys(data).map((key) => {
      if ([`warehouse`, `product`].includes(key)) {
        const nestedObject = data[key];
        const keyValues = Object.keys(nestedObject).map((k) => `${nestedObject[k]}`.trim().toLowerCase());
        return keyValues.join(``);
      } else {
        return `${data[key]}`.trim().toLowerCase();
      }
    });
    return propertyValues.join(``).includes(filter);
  }
}
