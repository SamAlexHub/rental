import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.endpoint + '/v1';

  constructor(private http: HttpClient) { }

  adminLogin(data: any): Observable<any> {
    console.log('data', data);

    const url = this.url + '/admin/login';
    console.log('url', url);

    const headers = new HttpHeaders({
      "contentType": 'application/json'
    });

    return this.http.post(url, data, { headers }).pipe(catchError(this.handleError));

  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      error.error.message;
    } else { error.status, error.error }
    return throwError(() => new Error('something wrong'));
  }

}
