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
    selector: 'app-customer-dialogue',
    templateUrl: './customer.dialogue.html',
})
export class CustomerDialogComponent implements OnInit {
    form!: FormGroup;
    mode: 'create' | 'edit' = 'create';
    emitEvents: any = { data: null, event: 'cancel' };
    

    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CustomerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private categoryService: CategoryService, private bookingService: BookingService, private datePipe: DatePipe, private customerService: CustomerService) { }

    ngOnInit(): void {
        this.mode = this.data.mode;
        this.form = this.fb.group({
            name: new FormControl('',Validators.required),
            phone: new FormControl(),
            address: new FormControl(),
            proof: new FormControl()
        });
        if (this.mode === 'edit') {
        	this.form.patchValue({
        		name: this.data.values.name,
                phone:this.data.values.phone,
                address:this.data.values.address,
                proof:this.data.values.proof
        	});
        }

    }

    onSubmitForm(): void {
        if (this.form.invalid) return;
        this.dialogRef.close(Object.assign({}, this.emitEvents, { data: this.form.value, event: 'confirm', mode: this.mode,}));
    }

    
    
}
