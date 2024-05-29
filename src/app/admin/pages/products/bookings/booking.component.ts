import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from "@angular/material/table";
import { BookingDialogComponent } from "../dialogs/booking-dialog/booking-dialog.component"
import { BookingService } from "src/app/services/booking/booking.service";
import { DatePipe } from "@angular/common";
import { ConfirmComponent } from "src/app/shared/components/dialogs/confirm/confirm.component";

export interface PeriodicElement {
    name: string;
    catID: String;
}
const ELEMENT_DATA: [] = [];

@Component({
    selector: 'app-booking',
    templateUrl: 'booking.component.html',
    styleUrls: ['booking.component.scss']
})


export class BookingsComponent implements OnInit {

    displayedColumns: string[] = ['index', 'Customer', 'Phone', 'Product', 'Booking Date', 'Return Date', 'Amount', 'Actions'];
    dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    selectedDate: Date | undefined;

    constructor(private dialog: MatDialog, private bookingService: BookingService, private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.listBookings();
    }

    listBookings() {
        this.bookingService.listProducts().subscribe((res: any) => {
            this.dataSource = res.data;
        });
    }

    onOpenBookingDialog(mode: string, values?: any, id?: String) {
        const dialogRef = this.dialog.open(BookingDialogComponent, {
            width: '600px',
            disableClose: true,
            data: { values, mode },
        });



        dialogRef.afterClosed().subscribe((res) => {
            if (res.event === 'confirm' && res.mode === 'create') {
                this.bookingService.createBooking(res.data).subscribe((res: any) => {
                    this.listBookings();
                });

            } else if (res.event === 'confirm' && res.mode === 'edit') {
                this.bookingService.updateBooking(res.data, id).subscribe((res: any) => {
                    this.listBookings();
                })
            }
        });
    }

    getDateWiseFilter() {
        if (this.selectedDate) {
            this.bookingService.getBookingByDate(this.selectedDate).subscribe((res: any) => {
                this.dataSource = res.data;
            })
        }
    }

    deleteBooking(element: any) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            disableClose: true,
            data: { message: `Are you sure you want to delete this booking ${element?.product?.name} ?`, title: 'Delete Confirmation' },
        });
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                if (element._id) {
                    this.bookingService.deleteBooking(element._id).subscribe((res: any) => {
                        this.listBookings();
                    });
                }
            }
        });

    }

}