import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { BookingService } from 'src/app/services/booking/booking.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

export interface DialogData {
	values: any;
	mode: any;
}

@Component({
	selector: 'app-booking-dialog',
	templateUrl: './booking-dialog.component.html',
	styleUrls: ['./booking-dialog.component.scss'],
})
export class BookingDialogComponent implements OnInit {
	form!: FormGroup;
	mode: 'create' | 'edit' = 'create';
	emitEvents: any = { data: null, event: 'cancel' };
	cId: String = '';
	categoryList: any;
	productList: any[] = [];
	customerList: any[] = [];
	selectedCategoryId: String | undefined;

	constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<BookingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private categoryService: CategoryService, private bookingService: BookingService, private datePipe: DatePipe, private customerService: CustomerService) { }

	ngOnInit(): void {
		this.mode = this.data.mode;
		this.form = this.fb.group({
			category: new FormControl(),
			product: new FormControl(),
			booking_date: new FormControl(),
			return_date: new FormControl(),
			customer: new FormControl()
		});
		if (this.mode === 'edit') {
			if (this.data.values?.product?.category) { this.getProductByCategory(this.data.values?.product?.category) }
			this.form.patchValue({
				category: this.data.values?.product?.category,
				product: this.data.values.productId,
				booking_date: this.data.values.booking_date,
				return_date: this.data.values.return_date,
				customer: this.data.values.customerId
			});
		}

		this.getCategoryList();
	}

	onSubmitForm(): void {
		if (this.form.invalid) return;
		this.selectedCategoryId = this.form.value.category;
		let form = {
			categoryId: '',
			productId: '',
			booking_date: '',
			return_date: '',
			customerId: ''
		}
		form.categoryId = this.form.value.category;
		form.productId = this.form.value.product;
		form.customerId = this.form.value.customer;
		form.booking_date = this.form.value.booking_date;
		form.return_date = this.form.value.return_date;

		this.dialogRef.close(Object.assign({}, this.emitEvents, { data: form, event: 'confirm', mode: this.mode, id: this.cId }));
	}

	getCategoryList() {
		this.categoryService.listCategories().subscribe((res: any) => {
			if (res.category) {
				this.categoryList = res.category;
			}
		});
		this.getCustomerList();
	}
	onCategoryChange(event: any) {
		this.getProductByCategory(event.target.value);
	}

	getProductByCategory(id: String) {
		this.bookingService.getProductByCategory(id).subscribe((res: any) => {
			this.productList = res.product;
		});
	}

	getCustomerList() {
		this.customerService.listCustomers().subscribe((res: any) => {
			if (res.data) { this.customerList = res.data }
		});
	}
}
