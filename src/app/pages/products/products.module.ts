import { NgModule } from '@angular/core';
import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductsPage } from './products.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    SharedModule,
    ProductsPageRoutingModule
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
