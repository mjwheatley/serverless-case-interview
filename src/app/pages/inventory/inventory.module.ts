import { NgModule } from '@angular/core';
import { InventoryPageRoutingModule } from './inventory-routing.module';
import { InventoryPage } from './inventory.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    SharedModule,
    InventoryPageRoutingModule
  ],
  declarations: [InventoryPage]
})
export class InventoryPageModule {}
