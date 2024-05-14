import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
	declarations: [LoginComponent, ForgotPasswordComponent],
	imports: [CommonModule, AuthRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class AuthModule {}
