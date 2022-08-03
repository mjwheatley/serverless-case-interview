import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../API.service';
import { MyAPIService } from '../../../MyAPI.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss']
})
export class ProductPage implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  public itemId: string;
  public item: any = {};
  public formGroup: FormGroup;
  public displayedColumns: string[] = ['warehouseId', 'inventory', 'cost'];
  public dataSource: MatTableDataSource<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private apiService: MyAPIService,
    private liveAnnouncer: LiveAnnouncer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.formGroup = new FormGroup({
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
      name: new FormControl(
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
      manufacturer: new FormControl(
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
      cost: new FormControl(
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
      price: new FormControl(
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
    this.itemId = this.activatedRoute.snapshot.paramMap.get('id');
    this.item = this.router.getCurrentNavigation()?.extras?.state?.item;
    console.log(`state item`, this.item);
    await this.zone.run(async () => {
      if (this.itemId && this.itemId !== `create` && !this.item?.id) {
        this.item = await this.apiService.GetProduct(this.itemId);
        console.log(`item`, this.item);
      }
      this.updateFormGroup();
      this.setItems(this.item.inventory.items);
    });
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
      .map(item => item.inventory * this.item.cost)
      .reduce((acc, value) => acc + value, 0);
  }

  public async navigate(item: any) {
    await this.router.navigateByUrl(`warehouses/warehouse/${item.warehouse.id}`);
  }

  public updateFormGroup() {
    const {
      productId,
      name,
      manufacturer,
      cost,
      price
    } = this.item as Product;

    this.formGroup.setValue({
      productId,
      name,
      manufacturer,
      cost,
      price
    });
  }

  private setItems(items: any[]) {
    items.sort((a, b) => {
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
