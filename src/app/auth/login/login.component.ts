import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserResponse } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	form!: FormGroup;

	constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
		});
	}

	onSubmitForm(): void {
		this.router.navigate(['admin/dashboard']);
		// if (this.form.invalid) return;
		// const body = { email: this.form.value.email.trim(), password: this.form.value.password.trim() };
		// this.authService.login(body).subscribe({
		// 	next: (res: UserResponse) => {
		// 		if (res && res.data.hasOwnProperty('access_token')) {
		// 			const role = this.authService.currentUserValue.user.role;
		// 			setTimeout(() => {
		// 				if (role === Role.user || role === Role.admin) {
		// 					this.router.navigate(['/', Role.admin]);
		// 				}
		// 			}, 10);
		// 		}
		// 	},
		// 	error: ({ error }) => {
		// 		this.snackBar.open(error.message || 'something went wrong please try again', '', {
		// 			duration: 3000,
		// 		});
		// 	},
		// });
		// this.form.reset();
	}
}
