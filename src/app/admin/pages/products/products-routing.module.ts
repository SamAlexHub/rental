import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductRentComponent } from './product-rent/product-rent.component';
import { ProductsOutletComponent } from './products-outlet.component';
import { BookingsComponent } from './bookings/booking.component';
import { CustomerComponent } from './customer/customer';

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
				path: 'inventory/:id',
				component: ProductRentComponent,
				data: {
					pageTitle: 'Inventory',
				},
			},
			{
				path: 'bookings',
				component: BookingsComponent, 
				 data: { pageTitle: 'Bookings' } 
			},
			{
				path: 'customer',
				component: CustomerComponent, 
				 data: { pageTitle: 'Customer' } 
			}

],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProductsRoutingModule { }
