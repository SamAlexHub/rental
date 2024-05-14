import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { LoginUser } from '../models/credentials';
import { UserData, UserResponse } from '../models/user';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private localKey: string = 'mayoora';
	private readonly URL: string = environment.endpoint;
	private currentUserSubject!: BehaviorSubject<UserData>;
	private isAuthSubject!: BehaviorSubject<boolean>;
	public currentUser!: Observable<UserData>;
	public currentIsAuth!: Observable<boolean>;

	public get currentUserValue(): UserData {
		return this.currentUserSubject.value;
	}

	public get authentication(): boolean {
		return this.isAuthSubject.value;
	}

	constructor(private http: HttpClient, private router: Router) {
		this.currentUserSubject = new BehaviorSubject<UserData>(JSON.parse(localStorage.getItem(this.localKey) || '{}'));
		this.currentUser = this.currentUserSubject.asObservable();
		if (Object.keys(this.currentUserValue).length > 0 && this.currentUserValue.hasOwnProperty('user')) {
			this.isAuthSubject = new BehaviorSubject<boolean>(true);
			this.router.navigate(['/', this.currentUserValue.user.role]);
		} else {
			this.isAuthSubject = new BehaviorSubject<boolean>(false);
			this.router.navigateByUrl('/auth/login');
		}
		this.currentIsAuth = this.isAuthSubject.asObservable();
	}

	register(): void {}

	login({ email, password }: LoginUser): Observable<UserResponse> {
		const payload = {
			email,
			password,
		};
		return this.http.post<UserResponse>(`${this.URL}/auth/login`, payload).pipe(
			map((res: UserResponse) => {
				localStorage.setItem(this.localKey, JSON.stringify(res.data));
				this.currentUserSubject.next(res.data);
				this.isAuthSubject.next(true);
				return res;
			})
		);
	}

	logout(): any {
		localStorage.removeItem(this.localKey);
		this.currentUserSubject.next(<UserData>{});
		this.isAuthSubject.next(false);
		this.router.navigateByUrl('/auth/login');
		return of({ success: false });
	}
}
