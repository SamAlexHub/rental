import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { BookingService } from 'src/app/services/booking/booking.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

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
	profileForm!: FormGroup;
	mode: 'create' | 'edit' = 'create';
	emitEvents: any = { data: null, event: 'cancel' };
	cId: String = '';
	categoryList: any;
	productList: any[] = [];
	customerList: any[] = [];
	selectedCategoryId: String | undefined;
	showAdditionalFields: boolean = false;
	accessories = [];

	constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<BookingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private categoryService: CategoryService, private bookingService: BookingService, private datePipe: DatePipe, private customerService: CustomerService, private formBuilder: FormBuilder, private invService: InventoryService) { }

	get productAccessories(): FormArray {
		return this.form.get('productAccessories') as FormArray;
	}

	ngOnInit(): void {
		this.mode = this.data.mode;
		this.form = this.formBuilder.group({
			category: new FormControl(),
			product: new FormControl(),
			booking_date: new FormControl(),
			return_date: new FormControl(),
			customer: new FormControl(),
			productAccessories: this.fb.array([])
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
		// if (this.form.invalid) return;
		let data = { 
			booking_date: this.form.get('booking_date')?.value,
            return_date: this.form.get('return_date')?.value,
            paymentDetails:'',
            booked_items:this.booked_items,
			customer:this.form.get('customer')?.value,
		}
		// formData.productAccessories = formData.productAccessories.filter((acc: any) => acc.selected);
		this.dialogRef.close(Object.assign({}, this.emitEvents, { data: data, event: 'confirm', mode: this.mode, id: this.cId }));
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


	onProductChange(event: any) {
		const selectedProductId = event.target.value;
		if (selectedProductId) {
			this.invService.getProductById(selectedProductId).subscribe((res: any) => {
				this.showAdditionalFields = true;
				this.populateAccessories( res.product.accessories);
			}, (err) => {
				console.log('Api Error', err);
			});
		}
	}

	populateAccessories(accessories: any[]) {
		this.productAccessories.clear();
		accessories.forEach(accessory => {
			this.productAccessories.push(this.fb.group({
				name: [accessory.name],
				quantity: [accessory.quantity],
				selected: [false]
			}));
		});
	}

	booked_items: any[] = [];


	addToCart() { 
		const formData = this.form.value;
		formData.productAccessories = formData.productAccessories.filter((acc: any) => acc.selected);
		
		let products = {
			category_id:this.form.get('category')?.value,
			product_id:this.form.get('product')?.value,
			accessories:formData.productAccessories
		}
		this.booked_items.push(products);
        this.form.reset();
        this.productAccessories.clear();
		console.log('values',this.booked_items);

	}

}
