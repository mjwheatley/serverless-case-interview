import { NgModule } from '@angular/core';
import { ProductPageRoutingModule } from './product-routing.module';
import { ProductPage } from './product.page';
import { SharedModule } from '../../../shared.module';

@NgModule({
  imports: [
    SharedModule,
    ProductPageRoutingModule
  ],
  declarations: [ProductPage]
})
export class ProductPageModule {}
