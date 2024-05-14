import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { MainComponent } from './layouts/main/main.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [MainComponent, HeaderComponent],
	imports: [CommonModule, AdminRoutingModule, MaterialModule, FormsModule, SharedModule],
})
export class AdminModule {}
