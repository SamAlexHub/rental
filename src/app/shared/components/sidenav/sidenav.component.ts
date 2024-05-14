import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { Menu } from 'src/app/core/models/menu';

@Component({
	selector: 'sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [style({ opacity: 0 }), animate('350ms', style({ opacity: 1 }))]),
			transition(':leave', [style({ opacity: 0 }), animate('350ms', style({ opacity: 0 }))]),
		]),
		trigger('rotate', [
			transition(':enter', [
				animate('1000ms', keyframes([style({ transform: 'rotate(0deg)', offset: '0' }), style({ transform: 'rotate(2turn)', offset: '1' })])),
			]),
		]),
	],
})
export class SidenavComponent implements OnInit {
	@Input() collapsed: boolean = true;
	@Input() menus!: Menu[];
	@Input() multiple: boolean = false;

	constructor(private router: Router) {}

	ngOnInit(): void {}

	handleClick(item: Menu): void {
		if (!this.multiple) {
			for (let menu of this.menus) {
				if (item !== menu && menu.expanded) {
					menu.expanded = false;
				}
			}
		}
		item.expanded = !item.expanded;
	}

	getActiveClass(item: Menu): string {
		return this.router.url.includes(item.link) && item.expanded ? 'active' : '';
	}

	handleLinkClick(item: Menu): void {
		if (!this.multiple) {
			for (let menu of this.menus) {
				if (item !== menu && menu.expanded) {
					menu.expanded = false;
				}
			}
		}
		item.expanded = !item.expanded;
	}
}
