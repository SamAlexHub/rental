import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserResponse } from 'src/app/core/models/user';
import { AuthService } from '../../services/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	form!: FormGroup;
	error: String = '';

	constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
		});
	}

	onSubmitForm(): void {
		if (this.form.invalid) return;
		const body = { email: this.form.value.email.trim(), password: this.form.value.password.trim() };
		this.authService.adminLogin(body).subscribe({
			next: (res) => {
				if (res && res.hasOwnProperty('token')) {
					localStorage.setItem('token', res.token);
					this.error = '';
					this.snackBar.open(res.data.name, 'Logged in....', { duration: 100 })
					this.router.navigate(['admin/dashboard']);
				}
				if (res.success == false) {
					this.error = res.message;
				}
			},
			error: (err) => {
				this.snackBar.open(err.message || 'something went wrong please try again', '', {
					duration: 300,
				});
			}
		});
	}
}
