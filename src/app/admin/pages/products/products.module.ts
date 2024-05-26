import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductRentComponent } from './product-rent/product-rent.component';
import { ProductsOutletComponent } from './products-outlet.component';
import { CategoryDialogComponent } from './dialogs/category-dialog/category-dialog.component';
import { BookingsComponent } from './bookings/booking.component';
import { BookingDialogComponent } from './dialogs/booking-dialog/booking-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
	providers:[DatePipe],
	declarations: [ProductCategoryComponent, ProductRentComponent,ProductsOutletComponent, CategoryDialogComponent,BookingsComponent,BookingDialogComponent],
	imports: [CommonModule, ReactiveFormsModule, MaterialModule, SharedModule, ProductsRoutingModule,MatDatepickerModule,MatInputModule,MatNativeDateModule],
})
export class ProductsModule {}
