import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  url = environment.endpoint + '/v1/booking';
  productUrl = environment.endpoint + '/v1/product';
  local = 'http://localhost:8100' + '/v1/booking'

  constructor(private http: HttpClient) { }

  listProducts() {
    const url = this.url + '/list';
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.get(url, { headers });
  }

  createBooking(data: any) {
    const url = this.url + '/create';
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.post(url, data, { headers });
  }

  updateBooking(data: any, id?: String) {
    const url = this.url + `/update/${id}`;
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.put(url, data, { headers });
  }

  getProductByCategory(id: String) {

    const url = this.productUrl + '/listprodcutByCatId';

    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.post(url, { id: id }, { headers });
  }

  getBookingByDate(date: any) {
    const url = this.url + '/date';
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.post(url, { date: date }, { headers });
  }

  deleteBooking(id?: String) {
    const url = this.url + `/delete/${id}`;
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.delete(url, { headers });
  }
}
