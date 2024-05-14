import { Component, EventEmitter, Inject, OnInit, Output, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Output() toggled: EventEmitter<boolean> = new EventEmitter<boolean>();
	readonly themeAnchor = this.document.getElementById('app-theme');
	isToggle: boolean = false;
	isThemeMode: boolean = false;

	constructor(private router: Router, @Inject(DOCUMENT) private document: Document, private randerer: Renderer2, private authService: AuthService) {}

	ngOnInit(): void {}

	onToggleCollapse() {
		this.isToggle = !this.isToggle;
		this.toggled.emit(this.isToggle);
	}

	onLogout(): void {
		this.authService.logout();
	}

	onChangeThemeMode(event: boolean) {
		this.isThemeMode = event;
		if (event && this.isThemeMode) {
			this.randerer.setAttribute(this.themeAnchor, 'href', '/dark-theme.css');
		} else {
			this.randerer.setAttribute(this.themeAnchor, 'href', '/light-theme.css');
		}
	}
}
