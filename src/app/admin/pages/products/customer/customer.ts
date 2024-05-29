import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from "@angular/material/table";

import { InventoryService } from "src/app/services/inventory/inventory.service";
import { InventoryDialogComponent } from "../dialogs/inventory-dialogue/inventory.dialogue";
import { ConfirmComponent } from "src/app/shared/components/dialogs/confirm/confirm.component";
import { CustomerDialogComponent } from "../dialogs/customer-dialogue/customer.dialogue";
import { CustomerService } from "src/app/services/customer/customer.service";

export interface PeriodicElement {
    name: string;
    catID: String;
}
const ELEMENT_DATA: [] = [];

@Component({
    selector: 'app-customer',
    templateUrl: './customer.html',
})
export class CustomerComponent implements OnInit {

    displayedColumns: string[] = ['index', 'Name', 'Phone', 'Address', 'Proof', 'Actions'];
    dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    constructor(private dialog: MatDialog, private cuService: CustomerService) { }

    ngOnInit(): void {
        this.customers();
    }

    customers() {
        this.cuService.listCustomers().subscribe((res: any) => {
            if (res.data) { this.dataSource = res.data }
        })
    }

    onOpenCustomerDialog(mode: string, values?: any, id?: String) {
        const dialogRef = this.dialog.open(CustomerDialogComponent, {
            width: '600px',
            disableClose: true,
            data: { values, mode },
        });

        dialogRef.afterClosed().subscribe((res) => {
            if (res.event === 'confirm' && res.mode === 'create') {
                this.cuService.createCustomers(res.data).subscribe((res) => {
                    this.customers();
                })

            } else if (res.event === 'confirm' && res.mode === 'edit') {
                console.log('res', values);
                if (id) {
                    this.cuService.updateCustomer(res.data, id).subscribe((res: any) => {
                        if (res.data) {
                            this.customers();
                        }
                    });
                }
            }
        });
    }

    deleteCustomer(element: any) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            disableClose: true,
            data: { message: `Are you sure you want to delete ${element?.name} ?`, title: 'Delete Confirmation' },
        });
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                if (element._id) {
                    this.cuService.deleteCustomer(element?._id).subscribe((res: any) => {
                        this.customers();
                    })
                }
            }
        });

    }

}
