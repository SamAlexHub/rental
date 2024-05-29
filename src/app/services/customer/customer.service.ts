import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = environment.endpoint + '/v1/customer';


  constructor(private http: HttpClient) { }

  listCustomers() {
    const url = this.url + '/list';
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.get(url, { headers })
  }

  createCustomers(data: any) {
    const url = this.url + '/create';
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.post(url, data, { headers })
  }

  updateCustomer(data: any,id?:String) {
    const url = this.url + `/update/${id}`;
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.put(url, data, { headers })
  }

  deleteCustomer(id?: any) {
    const url = this.url + `/delete/${id}`;
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.delete(url, { headers })
  }

}
