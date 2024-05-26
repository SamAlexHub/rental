import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from "@angular/material/table";
import { BookingDialogComponent } from "../dialogs/booking-dialog/booking-dialog.component"
import { InventoryService } from "src/app/services/inventory/inventory.service";

export interface PeriodicElement {
  name: string;
  catID: String;
}
const ELEMENT_DATA: [] = [];

@Component({
  selector: 'app-product-rent',
  templateUrl: './product-rent.component.html',
  styleUrls: ['./product-rent.component.scss']
})
export class ProductRentComponent implements OnInit {

  displayedColumns: string[] = ['index', 'Product', 'Serial No', 'Rent', 'Stock', 'Actions'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productList: any[] = [];

  constructor(private dialog: MatDialog, private invService: InventoryService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.invService.listProducts().subscribe((res: any) => {
      if (res.product) { this.dataSource = res.product }
    })
  }

  onOpenBookingDialog(mode: string, values?: any) {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { values, mode },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res.event === 'confirm' && res.mode === 'create') {


      } else if (res.event === 'confirm' && res.mode === 'edit') {


      }
    });
  }

}
