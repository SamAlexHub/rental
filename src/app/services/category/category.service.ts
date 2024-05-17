import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.endpoint + '/v1/category';

  constructor(private http: HttpClient) { }

  createCategory(data: String) {
    const url = this.url + '/create';

    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.post(url, data, { headers });
  }

  updateCategory(id: String,data: String) {
    const url = this.url + `/update/${id}`;

    const headers = new HttpHeaders({
      "contentType": 'application/json',
    });
    return this.http.put(url, data, { headers });
  }


  listCategories() {
    const url = this.url + '/list';
    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });
    return this.http.get(url, { headers });
  }

  deleteCategory(id: String) {
    const url = this.url + `/delete/${id}`;
    const headers = new HttpHeaders({
      "contentType": 'application/json',
    });
    return this.http.delete(url, { headers });
  }

}
