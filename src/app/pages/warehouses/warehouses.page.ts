import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from 'aws-amplify';
import { StoragePutResponse } from '../../models';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../services';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MyAPIService } from '../../MyAPI.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.page.html',
  styleUrls: ['./warehouses.page.scss']
})
export class WarehousesPage implements OnInit {
  @ViewChild('hiddenFileInput') hiddenFileInput;
  @ViewChild(MatSort) sort: MatSort;
  public items: any;
  public displayedColumns: string[] = ['warehouseId', 'name', 'address', 'city', 'state', 'zipcode', 'phoneNumber'];
  public dataSource: MatTableDataSource<any>;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
    private apiService: MyAPIService,
    private liveAnnouncer: LiveAnnouncer,
    private changeDetectorRef: ChangeDetectorRef
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
    await this.router.navigateByUrl(`warehouses/warehouse/${item.id}`, { state: { item } });
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

  private setItems(items: any[]) {
    this.items = items.sort((a, b) =>
      a.warehouseId > b.warehouseId ? 1 :
        a.warehouseId < b.warehouseId ? -1 : 0
    );
    this.dataSource = new MatTableDataSource(items);
    this.dataSource.filterPredicate = this.filterPredicate.bind(this);
    this.changeDetectorRef.detectChanges();
    this.dataSource.sort = this.sort;
  }

  private filterPredicate(data: any, filter: string): boolean {
    const propertyValues = Object.keys(data).map((key) => `${data[key]}`.trim().toLowerCase());
    return propertyValues.join(``).includes(filter);
  }
}
