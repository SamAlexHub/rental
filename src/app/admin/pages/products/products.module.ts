import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductRentComponent } from './product-rent/product-rent.component';
import { StockComponent } from './stock/stock.component';
import { ProductsOutletComponent } from './products-outlet.component';
import { CategoryDialogComponent } from './dialogs/category-dialog/category-dialog.component';

@NgModule({
	declarations: [ProductCategoryComponent, ProductRentComponent, StockComponent, ProductsOutletComponent, CategoryDialogComponent],
	imports: [CommonModule, ReactiveFormsModule, MaterialModule, SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
