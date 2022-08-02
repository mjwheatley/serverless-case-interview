import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService, Product } from '../../../API.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss']
})
export class ProductPage implements OnInit {
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
    await this.zone.run(async () => {
      if (this.itemId && this.itemId !== `create` && !this.item.id) {
        this.item = await this.apiService.GetProduct(this.itemId);
        console.log(`item`, this.item);
        const {
          name,
          manufacturer,
          cost,
          price
        } = this.item as Product;

        this.formGroup.setValue({
          name,
          manufacturer,
          cost,
          price
        });
      }
    });
  }
}
