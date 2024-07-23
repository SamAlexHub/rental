import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const Materials = [
	FlexLayoutModule,
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatSidenavModule,
	MatMenuModule,
	MatListModule,
	MatIconModule,
	MatToolbarModule,
	MatTableModule,
	MatPaginatorModule,
	MatSortModule,
	MatDialogModule,
	MatCardModule,
	MatSnackBarModule,
];

@NgModule({
	imports: [...Materials],
	exports: [...Materials],
})
export class MaterialModule {}
