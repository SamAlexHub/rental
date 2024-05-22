import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category/category.service';

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
	constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<BookingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private categoryService: CategoryService) { }

	ngOnInit(): void {
		this.mode = this.data.mode;
		this.form = this.fb.group({
			name: new FormControl('', [Validators.required]),
		});
		// this.cId = this.data.values._id;
		// if (this.mode === 'edit') {
		// 	this.form.patchValue({
		// 		name: this.data.values.name,
		// 	});
		// }

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
		})
	}
}
