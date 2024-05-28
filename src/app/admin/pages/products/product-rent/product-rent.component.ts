import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from "@angular/material/table";

import { InventoryService } from "src/app/services/inventory/inventory.service";
import { InventoryDialogComponent } from "../dialogs/inventory-dialogue/inventory.dialogue";
import { ConfirmComponent } from "src/app/shared/components/dialogs/confirm/confirm.component";

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

  onOpenInventoryDialog(mode: string, values?: any, id?: String) {
    const dialogRef = this.dialog.open(InventoryDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { values, mode },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res.event === 'confirm' && res.mode === 'create') {
        this.invService.createProducts(res.data).subscribe((res) => {
          this.listProducts();
        })

      } else if (res.event === 'confirm' && res.mode === 'edit') {

        if (id) {
          this.invService.updateProduct(res.data, id).subscribe((res) => {
            this.listProducts();
          })
        }
      }
    });
  }

  deleteProduct(element: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      data: { message: `Are you sure you want to delete ${element?.name} ?`, title: 'Delete Confirmation' },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        if (element._id) {
          this.invService.deleteProduct(element?._id).subscribe((res: any) => {
            this.listProducts();
          })
        }
      }
    });

  }

}
