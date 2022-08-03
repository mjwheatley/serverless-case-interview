import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService, Warehouse } from '../../../API.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.page.html',
  styleUrls: ['./warehouse.page.scss']
})
export class WarehousePage implements OnInit {
  public itemId: string;
  public item: any = {};
  public formGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private apiService: APIService
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
    await this.zone.run(async () => {
      if (this.itemId && this.itemId !== `create` && !this.item?.id) {
        this.item = await this.apiService.GetWarehouse(this.itemId);
        console.log(`item`, this.item);
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
    });
  }
}
