import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService, Inventory } from '../../../API.service';
import { MatTableDataSource } from '@angular/material/table';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inventory-info',
  templateUrl: './inventory-info.page.html',
  styleUrls: ['./inventory-info.page.scss']
})
export class InventoryInfoPage implements OnInit {
  public itemId: string;
  public item: any = {};
  public items: any[] = [];
  public formGroup: FormGroup;
  public warehouses: any[] = [];
  public products: any[] = [];
  public displayedColumns: string[] = ['warehouseId', 'productId', 'inventory'];
  public dataSource: MatTableDataSource<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private apiService: APIService,
    private alertCtrl: AlertController
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
      ),
      inventory: new FormControl(
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
    this.formGroup.valueChanges.subscribe((data) => {
      const warehouse = this.warehouses.find(i => i.id === data.warehouseId);
      const product = this.products.find(i => i.id === data.productId);
      this.item = {
        warehouseId: warehouse.warehouseId,
        productId: product.productId,
        warehouse,
        product,
        warehouseInventoryId: warehouse?.id,
        productInventoryId: product?.id
      } as Inventory;
      this.setItems([this.item]);
    });
  }

  async ngOnInit() {
    this.itemId = this.activatedRoute.snapshot.paramMap.get('id');
    this.item = this.router.getCurrentNavigation()?.extras?.state?.item;
    console.log(`state item`, this.item);
    const { items: warehouses } = await this.apiService.ListWarehouses();
    const { items: products } = await this.apiService.ListProducts();
    warehouses.sort((a, b) =>
      a.warehouseId > b.warehouseId ? 1 :
        a.warehouseId < b.warehouseId ? -1 : 0
    );
    products.sort((a, b) =>
      a.productId > b.productId ? 1 :
        a.productId < b.productId ? -1 : 0);
    this.warehouses = warehouses;
    this.products = products;
    await this.zone.run(async () => {
      if (this.itemId && this.itemId !== `create` && !this.item?.id) {
        this.item = await this.apiService.GetInventory(this.itemId);
        console.log(`item`, this.item);
      }
      if (this.itemId !== 'create') {
        this.updateFormGroup();
        this.setItems([this.item]);
      }
    });
  }

  public updateFormGroup() {
    if (this.item) {
      const {
        warehouseInventoryId: warehouseId,
        productInventoryId: productId,
        inventory
      } = this.item as Inventory;

      this.formGroup.setValue({
        warehouseId,
        productId,
        inventory
      });
    }
  }

  public async save() {
    if (this.formGroup.valid) {
      console.log(`formGroup`, this.formGroup.value);
      const item = JSON.parse(JSON.stringify(this.item));
      delete item.warehouse;
      delete item.product;
      if (this.itemId === `create`) {
        try {
          const inventory = await this.apiService.CreateInventory(item);
          const alert = await this.alertCtrl.create({
            header: `Create Inventory`,
            message: `Successfully saved inventory information.`,
            buttons: [{ text: `OK` }]
          });
          alert.onDidDismiss().then(async () => {
            await this.router.navigateByUrl(`inventory/inventory-info/${inventory.id}`, { replaceUrl: true });
          });
          await alert.present();
        } catch (error) {
          const alert = await this.alertCtrl.create({
            header: `Create Inventory Error`,
            message: error.message,
            buttons: [{ text: `OK` }]
          });
          await alert.present();
        }
      } else {
        try {
          await this.apiService.UpdateInventory({
            id: this.itemId,
            ...item
          });
          const alert = await this.alertCtrl.create({
            header: `Update Inventory`,
            message: `Successfully saved inventory information.`,
            buttons: [{ text: `OK` }]
          });
          await alert.present();
        } catch (error) {
          const alert = await this.alertCtrl.create({
            header: `Update Inventory Error`,
            message: error.message,
            buttons: [{ text: `OK` }]
          });
          await alert.present();
        }
      }
    }
  }

  private setItems(items: any[]) {
    this.items = items;
    this.dataSource = new MatTableDataSource(items);
  }
}
