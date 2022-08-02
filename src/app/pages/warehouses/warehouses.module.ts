import { NgModule } from '@angular/core';
import { WarehousesPageRoutingModule } from './warehouses-routing.module';
import { WarehousesPage } from './warehouses.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    SharedModule,
    WarehousesPageRoutingModule
  ],
  declarations: [WarehousesPage]
})
export class WarehousesPageModule {}
