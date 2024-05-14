import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdminstrationOutletComponent } from './adminstration-outlet.component';
import { BranchesComponent } from './branches/branches.component';

@NgModule({
	declarations: [AdminstrationOutletComponent, BranchesComponent],
	imports: [CommonModule, AdministrationRoutingModule],
})
export class AdministrationModule {}
