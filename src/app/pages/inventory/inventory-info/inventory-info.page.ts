import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../../API.service';

@Component({
  selector: 'app-inventory-info',
  templateUrl: './inventory-info.page.html',
  styleUrls: ['./inventory-info.page.scss']
})
export class InventoryInfoPage implements OnInit {
  public itemId: string;
  public item: any = {};
  public formGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private apiService: APIService
  ) {
  }

  async ngOnInit() {
    this.itemId = this.activatedRoute.snapshot.paramMap.get('id');
    this.item = this.router.getCurrentNavigation()?.extras?.state?.item;
    await this.zone.run(async () => {
      if (this.itemId && this.itemId !== `create` && !this.item?.id) {
        this.item = await this.apiService.GetProduct(this.itemId);
        console.log(`item`, this.item);
        // const {
        //   name,
        //   manufacturer,
        //   cost,
        //   price
        // } = this.item as Product;
        //
        // this.formGroup.setValue({
        //   name,
        //   manufacturer,
        //   cost,
        //   price
        // });
      }
    });
  }

}
