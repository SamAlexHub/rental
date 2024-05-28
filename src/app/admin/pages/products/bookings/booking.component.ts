import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from "@angular/material/table";
import { BookingDialogComponent } from "../dialogs/booking-dialog/booking-dialog.component"
import { BookingService } from "src/app/services/booking/booking.service";
import { DatePipe } from "@angular/common";

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

    onOpenBookingDialog(mode: string, values?: any) {
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

}