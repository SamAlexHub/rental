import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { MaterialModule } from '../material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { TableResponsiveDirective } from './directives/table-responsive.directive';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	declarations: [SidenavComponent, SublevelMenuComponent, ConfirmComponent, PageHeaderComponent, TableResponsiveDirective],
	imports: [CommonModule, RouterModule, MaterialModule,MatSelectModule],
	exports: [SidenavComponent, SublevelMenuComponent, ConfirmComponent, PageHeaderComponent, TableResponsiveDirective],
})
export class SharedModule {}
