import { NgModule } from '@angular/core';
import { WarehousePageRoutingModule } from './warehouse-routing.module';
import { WarehousePage } from './warehouse.page';
import { SharedModule } from '../../../shared.module';

@NgModule({
  imports: [
    SharedModule,
    WarehousePageRoutingModule
  ],
  declarations: [WarehousePage]
})
export class WarehousePageModule {}
