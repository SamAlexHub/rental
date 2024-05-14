import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminstrationOutletComponent } from './adminstration-outlet.component';
import { BranchesComponent } from './branches/branches.component';

const routes: Routes = [
	{
		path: '',
		component: AdminstrationOutletComponent,
		children: [
			{
				path: '',
				redirectTo: 'branches',
				pathMatch: 'full',
			},
			{
				path: 'branches',
				component: BranchesComponent,
				data: {
					pageTitle: 'Branches',
				},
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdministrationRoutingModule {}
