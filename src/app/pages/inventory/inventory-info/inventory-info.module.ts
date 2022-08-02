import { NgModule } from '@angular/core';
import { InventoryInfoPageRoutingModule } from './inventory-info-routing.module';
import { InventoryInfoPage } from './inventory-info.page';
import { SharedModule } from '../../../shared.module';

@NgModule({
  imports: [
    SharedModule,
    InventoryInfoPageRoutingModule
  ],
  declarations: [InventoryInfoPage]
})
export class InventoryInfoPageModule {}
