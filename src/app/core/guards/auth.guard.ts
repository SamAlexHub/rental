import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authService.currentUserValue && this.authService.authentication) {
			const userRole = this.authService.currentUserValue.user.role;
			if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
				this.router.navigate(['/auth/login']);
				return false;
			}
			return this.authService.authentication;
		}
		this.router.navigate(['/auth/login']);
		return false;
	}
}
