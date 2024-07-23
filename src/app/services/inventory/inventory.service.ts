import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  url = environment.endpoint + '/v1/product';
  

  constructor(private http: HttpClient) { }

  listProducts() {
    const url = this.url + '/list';
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.get(url, { headers });
  }

  createProducts(data: any) {
    const url = this.url + '/create';
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.post(url, data, { headers });
  }

  updateProduct(data: any, id: String) {
    const url = this.url + `/update/${id}`;
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.put(url, data, { headers });
  }

  deleteProduct(id: String) {
    const url = this.url + `/delete/${id}`;
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.delete(url, { headers });
  }

  

  
}
