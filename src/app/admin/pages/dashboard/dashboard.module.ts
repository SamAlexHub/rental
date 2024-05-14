import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [OverviewComponent],
	imports: [CommonModule, DashboardRoutingModule, MaterialModule, SharedModule],
})
export class DashboardModule {}
