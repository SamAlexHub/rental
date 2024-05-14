import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../dialogs/category-dialog/category-dialog.component';

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
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  dataSource: any;


  constructor(private dialog: MatDialog) { }

 

  ngOnInit(): void {
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

}
