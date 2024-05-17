import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { CategoryDialogComponent } from '../dialogs/category-dialog/category-dialog.component';
import { dirxml } from 'console';
import { ConfirmComponent } from 'src/app/shared/components/dialogs/confirm/confirm.component';
import { CategoryService } from 'src/app/services/category/category.service';

export interface PeriodicElement {
	name: string;
	catID: String;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
	selector: 'app-product-category',
	templateUrl: './product-category.component.html',
	styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = ['index', 'catId', 'name', 'actions'];
	dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private dialog: MatDialog, private cateServices: CategoryService) { }

	ngOnInit(): void {
		this.listCategories();
	}

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

		dialogRef.afterClosed().subscribe((res) => {
			if (res.event === 'confirm' && res.mode === 'create') {
				this.cateServices.createCategory(res.data).subscribe((res: any) => {
					this.listCategories();
				});
			} else if (res.event === 'confirm' && res.mode === 'edit') {
				this.cateServices.updateCategory(res.id, res.data).subscribe((res: any) => {
					if (res.success == true) { this.listCategories(); }
				});

			}
		});

	}

	onRemoveItem(item: any): void {
		const dialogRef = this.dialog.open(ConfirmComponent, {
			disableClose: true,
			data: { message: `Are you sure you want to delete ${item?.name} ?`, title: 'Delete Confirmation' },
		});
		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				if (item._id) {
					this.cateServices.deleteCategory(item._id).subscribe((res: any) => {
						if (res.success == true) this.listCategories();
					});
				}
			}
		});
	}

	listCategories() {
		this.cateServices.listCategories().subscribe((res: any) => {
			if (res['category']) {
				this.dataSource.data = res.category
			}
		});
	}
}
