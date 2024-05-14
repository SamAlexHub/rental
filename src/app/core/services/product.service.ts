import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private readonly URL: string = environment.endpoint;

	constructor(private http: HttpClient) {}
}
