import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	values: any;
	mode: any;
}

@Component({
	selector: 'app-category-dialog',
	templateUrl: './category-dialog.component.html',
	styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
	form!: FormGroup;
	mode: 'create' | 'edit' = 'create';
	emitEvents: any = { data: null, event: 'cancel' };
	cId: String = '';

	constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

	ngOnInit(): void {
		this.mode = this.data.mode;
		this.form = this.fb.group({
			name: new FormControl('', [Validators.required]),
		});
		this.cId = this.data.values._id;
		if (this.mode === 'edit') {
			this.form.patchValue({
				name: this.data.values.name,
			});
		}
	}

	onSubmitForm(): void {
		if (this.form.invalid) return;
		this.dialogRef.close(Object.assign({}, this.emitEvents, { data: this.form.value, event: 'confirm', mode: this.mode,id:this.cId}));
	}
}
