import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryInfoPage } from './inventory-info.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryInfoPageRoutingModule {}
