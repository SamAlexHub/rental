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
}
