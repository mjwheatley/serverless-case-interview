import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Warehouse } from '../../../API.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyAPIService } from '../../../MyAPI.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.page.html',
  styleUrls: ['./warehouse.page.scss']
})
export class WarehousePage implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public itemId: string;
  public item: any = {};
  public formGroup: FormGroup;
  public displayedColumns: string[] = ['productId', 'inventory', 'cost'];
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
      address: new FormControl(
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
      phoneNumber: new FormControl(
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
        this.item = await this.apiService.GetWarehouse(this.itemId);
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
      .map(item => item.inventory * item.product.cost)
      .reduce((acc, value) => acc + value, 0);
  }

  public async navigate(item: any) {
    await this.router.navigateByUrl(`products/product/${item.product.id}`);
  }

  private updateFormGroup() {
    const {
      warehouseId,
      name,
      address,
      city,
      state,
      zipcode: postalCode,
      phoneNumber
    } = this.item as Warehouse;

    this.formGroup.setValue({
      warehouseId,
      name,
      address: {
        address,
        city,
        state,
        postalCode
      },
      phoneNumber
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
