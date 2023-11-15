import { NgModule } from '@angular/core';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { DetailsProductsComponent } from './components/details-products/details-products.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AllProductsComponent,
    DetailsProductsComponent,
    ProductComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class ProductsModule {}
