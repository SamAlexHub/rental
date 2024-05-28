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
    selector: 'app-inventory-dialog',
    templateUrl: './inventory.dialogue.html',
})
export class InventoryDialogComponent implements OnInit {
    form!: FormGroup;
    mode: 'create' | 'edit' = 'create';
    emitEvents: any = { data: null, event: 'cancel' };
    cId: String = '';
    categoryList: any;
    productList: any[] = [];
    customerList: any[] = [];
    selectedCategoryId: String | undefined;

    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<InventoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private categoryService: CategoryService, private bookingService: BookingService, private datePipe: DatePipe, private customerService: CustomerService) { }

    ngOnInit(): void {
        this.mode = this.data.mode;
        this.form = this.fb.group({
            category: new FormControl(),
            name: new FormControl(),
            serial_no: new FormControl(),
            inventory_stock: new FormControl(),
            rentperday: new FormControl()
        });
        // this.cId = this.data.values._id;
        if (this.mode === 'edit') {
        	this.form.patchValue({
                category:this.data.values.category,
        		name: this.data.values.name,
                serial_no:this.data.values.serial_no,
                inventory_stock:this.data.values.inventory_stock,
                rentperday:this.data.values.rentperday
        	});
        }

        this.getCategoryList();
    }

    onSubmitForm(): void {
        if (this.form.invalid) return;
        this.dialogRef.close(Object.assign({}, this.emitEvents, { data: this.form.value, event: 'confirm', mode: this.mode, id: this.cId }));
    }

    getCategoryList() {
        this.categoryService.listCategories().subscribe((res: any) => {
            if (res.category) {
                this.categoryList = res.category;
            }
        });
    }
    onCategoryChange(event: any) {
        this.getProductByCategory(event.target.value);
    }

    getProductByCategory(id: String) {
        this.bookingService.getProductByCategory(id).subscribe((res: any) => {
            this.productList = res.product;
        });
    }

    
}
