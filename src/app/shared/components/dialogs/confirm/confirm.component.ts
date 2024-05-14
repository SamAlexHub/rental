import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogMessage {
	title: string;
	message: string;
}

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
	title!: string;
	message!: string;

	constructor(public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogMessage) {
		this.title = data.title;
		this.message = data.message;
	}

	ngOnInit(): void {}
}
