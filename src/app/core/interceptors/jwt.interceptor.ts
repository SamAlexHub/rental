import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		// add authorization header with jwt token if available
		let currentUser = this.authService.currentUserValue;
		if (currentUser && currentUser.access_token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUser.access_token}`,
				},
			});
		}
		return next.handle(request);
	}
}
