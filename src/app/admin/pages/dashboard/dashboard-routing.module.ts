import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
	{
		path: '',
		component: OverviewComponent,
		pathMatch: 'full',
		data: { pageTitle: 'Dashboard' },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
