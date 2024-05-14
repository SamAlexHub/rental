import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { CategoryDialogComponent } from '../dialogs/category-dialog/category-dialog.component';
import { dirxml } from 'console';
import { ConfirmComponent } from 'src/app/shared/components/dialogs/confirm/confirm.component';

export interface PeriodicElement {
	name: string;
	catID: number;
	createdBy: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
	{ catID: 101, name: 'Hydrogen', createdBy: 'John Deo' },
	{ catID: 201, name: 'Helium', createdBy: 'James Smith' },
	{ catID: 323, name: 'Lithium', createdBy: 'Robert Patricia' },
	{ catID: 444, name: 'Beryllium', createdBy: 'John Jennifer' },
	{ catID: 534, name: 'Boron', createdBy: 'George Melissa' },
	{ catID: 612, name: 'Carbon', createdBy: 'Edward Rebecca' },
	{ catID: 756, name: 'Nitrogen', createdBy: 'Ryan Cynthia' },
	{ catID: 874, name: 'Oxygen', createdBy: 'Nicholas Angela' },
	{ catID: 912, name: 'Fluorine', createdBy: 'Stephen Brenda' },
	{ catID: 105, name: 'Neon', createdBy: 'Alexander' },
];

@Component({
	selector: 'app-product-category',
	templateUrl: './product-category.component.html',
	styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = ['index', 'catId', 'name', 'createdBy', 'actions'];
	dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private dialog: MatDialog) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	onOpenCateogryDialog(mode: string, values?: any): void {
		const dialogRef = this.dialog.open(CategoryDialogComponent, {
			width: '600px',
			disableClose: true,
			data: { values, mode },
		});
		dialogRef.afterClosed().subscribe((result: { data: any; event: string; mode: string }) => {
			if (result.event === 'confirm' && result.mode === 'edit') {
				for (let dx of this.dataSource.data) {
					if (dx.catID === result.data.catID && result.data.catID !== null) {
						dx.name = result.data.name;
						dx.createdBy = result.data.createdBy;
						break;
					}
				}
			} else if (result.event === 'confirm' && result.mode === 'create') {
				this.dataSource.data.push({ ...result.data, catID: Math.floor(Math.random() * 10 + 1) });
			}
		});
	}

	onRemoveItem(item: PeriodicElement): void {
		const dialogRef = this.dialog.open(ConfirmComponent, {
			disableClose: true,
			data: { message: `Are you sure you want to delete ${item?.name} ?`, title: 'Delete Confirmation' },
		});
		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				console.log(result);
			}
		});
	}
}
