import { Component, NgZone, OnInit } from '@angular/core';
import { Menu } from 'src/app/core/models/menu';
import { MenuData } from './menu-data';

const SMALL_WIDTH_BREAKPOINT = 768;

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
	collapsed: boolean = true;
	menus: Menu[] = MenuData;
	multiple: boolean = false;
	private mediaMacher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

	constructor(zone: NgZone) {
		this.mediaMacher.eventListeners = () => zone.run((mql) => (this.mediaMacher = mql));
	}

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

	isScreenSmall(): boolean {
		return this.mediaMacher.matches;
	}
}
