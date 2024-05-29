import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
			{
				path: 'dashboard',
				loadChildren: async () => await import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
			},
			{
				path: 'products',
				loadChildren: async () => await import('./pages/products/products.module').then((m) => m.ProductsModule),
			},

		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
