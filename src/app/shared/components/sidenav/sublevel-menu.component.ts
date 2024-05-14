import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/core/models/menu';

@Component({
	selector: 'sublevel-menu',
	template: `
		<div
			class="sublevel"
			*ngIf="collapsed && data?.children && data.children?.length"
			[@submenu]="
				expanded
					? { value: 'visible', params: { transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*' } }
					: { value: 'hidden', params: { transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0' } }
			"
		>
			<ng-container *ngFor="let child of data?.children">
				<mat-list-item
					class="sublevel-item"
					*ngIf="child?.children && child.children?.length"
					(click)="handleClick(child)"
					[ngClass]="getActiveClass(child)"
					]
				>
					<i class="fal" *ngIf="child?.children && collapsed" [ngClass]="!child?.expanded ? 'fa-angle-right' : 'fa-angle-down'"></i>
					<h3 @fadeInOut *ngIf="collapsed" matLine>{{ child?.label }}</h3>
				</mat-list-item>
				<mat-list-item
					class="sublevel-item-link"
					*ngIf="!child?.children || (child.children && child.children.length === 0)"
					[routerLink]="child?.link !== '' ? [child?.link] : null"
					routerLinkActive="active"
					[routerLinkActiveOptions]="{ exact: true }"
				>
					{{ child?.label }}
				</mat-list-item>
				<ng-container *ngIf="child?.children && child.children?.length">
					<sublevel-menu [data]="child" [collapsed]="collapsed" [multiple]="multiple" [expanded]="child.expanded"></sublevel-menu>
				</ng-container>
			</ng-container>
		</div>
	`,
	styleUrls: ['./sidenav.component.scss'],
	animations: [
		trigger('submenu', [
			state(
				'hidden',
				style({
					height: '0',
					overflow: 'hidden',
				})
			),
			state(
				'visible',
				style({
					height: '*',
				})
			),
			transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{ transitionParams }}')]),
			transition('void => *', animate(0)),
		]),
	],
})
export class SublevelMenuComponent implements OnInit {
	@Input() data!: Menu;
	@Input() collapsed: boolean = false;
	@Input() animating: boolean | undefined;
	@Input() expanded: boolean | undefined;
	@Input() multiple: boolean = false;

	constructor(private router: Router) {}

	ngOnInit(): void {}

	handleClick(item: Menu): void {
		if (!this.multiple) {
			if (this.data.children && this.data.children?.length) {
				for (let child of this.data.children) {
					if (item !== child && child.expanded) {
						child.expanded = false;
					}
				}
			}
		}
		item.expanded = !item.expanded;
	}

	getActiveClass(item: Menu): string {
		return item.expanded && this.router.url.includes(item.link) ? 'active' : '';
	}
}
