import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../services';
import { Storage } from 'aws-amplify';
import { StoragePutResponse } from '../../models';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MyAPIService } from '../../MyAPI.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit {
  @ViewChild('hiddenFileInput') hiddenFileInput;
  // @ViewChildren(MatSort) sorts: QueryList<MatSort>;
  @ViewChild(`sort`) sort: MatSort;
  @ViewChild(`sort2`) sort2: MatSort;
  public items: any;
  public displayedColumns: string[] = ['productId', 'name', 'manufacturer', 'cost', 'price'];
  public dataSource: MatTableDataSource<any>;
  public displayedColumns2: string[] = ['warehouseId', 'productQuantity', 'totalValueAtWarehouse'];
  public dataSource2: MatTableDataSource<any>;
  public formGroup: FormGroup;
  public formGroup2: FormGroup;
  public warehouses: any[];
  public getProductCostOfWarehouseResult: any;
  public gettingProductCostOfWarehouse: boolean;
  public getProductDataFromWarehousesResult: any;
  public gettingProductDataFromWarehouses: boolean;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
    private apiService: MyAPIService,
    private liveAnnouncer: LiveAnnouncer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.formGroup = new FormGroup({
      warehouseId: new FormControl(
        {
          value: null,
          disabled: false
        },
        {
          updateOn: 'change',
          validators: [
            Validators.required
          ]
        }
      ),
      productId: new FormControl(
        {
          value: null,
          disabled: false
        },
        {
          updateOn: 'change',
          validators: [
            Validators.required
          ]
        }
      )
    });
    this.formGroup2 = new FormGroup({
      productId: new FormControl(
        {
          value: null,
          disabled: false
        },
        {
          updateOn: 'change',
          validators: [
            Validators.required
          ]
        }
      )
    });
  }

  async ngOnInit() {
    const { items } = await this.apiService.ListProducts();
    this.setItems(items);
    const { items: warehouses } = await this.apiService.ListWarehouses();
    warehouses.sort((a, b) =>
      a.warehouseId > b.warehouseId ? 1 :
        a.warehouseId < b.warehouseId ? -1 : 0
    );
    this.warehouses = warehouses;
    this.apiService.OnCreateProductListener.subscribe((evt) => {
      const item = (evt as any).value.data.onCreateProduct;
      this.setItems([...this.items, item]);
    });
    this.apiService.OnUpdateProductListener.subscribe((evt) => {
      const item = (evt as any).value.data.onUpdateProduct;
      this.setItems(this.items.map((i) => {
        if (i.id === item.id) {
          item.inventory = i.inventory;
          return item;
        } else {
          return i;
        }
      }));
    });
    this.apiService.OnDeleteProductListener.subscribe((evt) => {
      const item = (evt as any).value.data.onDeleteProduct;
      this.setItems(this.items.filter((i) => i.id !== item.id));
    });
  }

  public async getProductCostOfWarehouse() {
    if (this.formGroup.valid) {
      this.getProductCostOfWarehouseResult = null;
      const {
        productId,
        warehouseId
      } = this.formGroup.value;
      const warehouse = this.warehouses.find(i => i.id === warehouseId);
      const product = this.items.find(i => i.id === productId);
      try {
        this.gettingProductCostOfWarehouse = true;
        const getProductCostOfWarehouseResult = await this.apiService.GetProductCostOfWarehouse(JSON.stringify({
          productId,
          warehouseId
        }));
        this.getProductCostOfWarehouseResult = {
          product,
          warehouse,
          total: getProductCostOfWarehouseResult
        };
        console.log(`getProductCostOfWarehouseResult`, this.getProductCostOfWarehouseResult);
        this.gettingProductCostOfWarehouse = false;
      } catch (error) {
        this.gettingProductCostOfWarehouse = false;
        console.error(`GetProductCostOfWarehouse() Error`, error);
        const alert = await this.alertCtrl.create({
          header: `Request Error`,
          subHeader: `GetProductCostOfWarehouse`,
          message: error.errors?.[0]?.message,
          buttons: [{ text: `OK` }]
        });
        await alert.present();
      }
    }
  }

  public async getProductDataFromWarehouses() {
    if (this.formGroup2.valid) {
      this.getProductDataFromWarehousesResult = null;
      const {
        productId
      } = this.formGroup2.value;
      const product = this.items.find(i => i.id === productId);
      try {
        this.gettingProductDataFromWarehouses = true;
        const getProductDataFromWarehousesResult = await this.apiService.GetProductDataFromWarehouses(productId);
        this.getProductDataFromWarehousesResult = {
          product,
          result: getProductDataFromWarehousesResult
        };
        console.log(`getProductDataFromWarehousesResult`, this.getProductDataFromWarehousesResult);
        this.gettingProductDataFromWarehouses = false;
        this.setItems2(getProductDataFromWarehousesResult.warehouses);
      } catch (error) {
        this.gettingProductDataFromWarehouses = false;
        console.error(`GetProductCostOfWarehouse() Error`, error);
        const alert = await this.alertCtrl.create({
          header: `Request Error`,
          subHeader: `GetProductCostOfWarehouse`,
          message: error.errors?.[0]?.message,
          buttons: [{ text: `OK` }]
        });
        await alert.present();
      }
    }
  }

  public async navigate(item: any) {
    await this.router.navigateByUrl(`products/product/${item.id}`, { state: { item } });
  }

  public async navigate2(item: any) {
    await this.router.navigateByUrl(`warehouses/warehouse/${item.warehouse.id}`);
  }

  public selectFile() {
    this.hiddenFileInput.nativeElement.value = ``;
    this.hiddenFileInput.nativeElement.click();
  }

  public async fileInputChangeListener($event) {
    this.loadingService.setIsLoading(true);
    const file: File = $event.target.files[0];
    const key = `products/${file.name}`;
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

  public applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  public getTotalInventory() {
    return this.dataSource2.filteredData.map(item => item.productQuantity).reduce((acc, value) => acc + value, 0);
  }

  public getTotalCost() {
    return this.dataSource2.filteredData
      .map(item => item.totalValueAtWarehouse)
      .reduce((acc, value) => acc + value, 0);
  }

  private setItems(items: any[]) {
    this.items = items.sort((a, b) =>
      a.productId > b.productId ? 1 :
        a.productId < b.productId ? -1 : 0
    );
    this.dataSource = new MatTableDataSource(items);
    this.dataSource.filterPredicate = this.filterPredicate.bind(this);
    this.changeDetectorRef.detectChanges();
    this.dataSource.sort = this.sort;
    // this.dataSource.sort = this.sorts.toArray()[0];
  }

  private filterPredicate(data: any, filter: string): boolean {
    const propertyValues = Object.keys(data).map((key) => `${data[key]}`.trim().toLowerCase());
    return propertyValues.join(``).includes(filter);
  }

  private setItems2(items: any[]) {
    items.sort((a, b) => {
      if (a.warehouse.warehouseId < b.warehouse.warehouseId) {
        return -1;
      } else if (a.warehouse.warehouseId > b.warehouse.warehouseId) {
        return 1;
      } else { // nothing to split them
        return 0;
      }
    });
    this.dataSource2 = new MatTableDataSource(items);
    this.dataSource2.filterPredicate = this.filterPredicate2.bind(this);
    this.changeDetectorRef.detectChanges();
    this.dataSource2.sort = this.sort2;
    // this.dataSource2.sort = this.sorts.toArray()[1];
    this.changeDetectorRef.detectChanges();
  }

  private filterPredicate2(data: any, filter: string): boolean {
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
