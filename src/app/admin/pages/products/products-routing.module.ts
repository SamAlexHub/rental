import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockComponent } from './stock/stock.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductRentComponent } from './product-rent/product-rent.component';
import { ProductsOutletComponent } from './products-outlet.component';

const routes: Routes = [
	{
		path: '',
		component: ProductsOutletComponent,
		children: [
			{
				path: '',
				redirectTo: 'product-category',
				pathMatch: 'full',
			},
			{
				path: 'product-category',
				component: ProductCategoryComponent,
				data: {
					pageTitle: 'Product Category',
				},
			},
			{
				path: 'product-rent',
				component: ProductRentComponent,
				data: {
					pageTitle: 'Product Rent',
				},
			},
			{
				path: 'stock',
				component: StockComponent,
				data: {
					pageTitle: 'Stock',
				},
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProductsRoutingModule {}
