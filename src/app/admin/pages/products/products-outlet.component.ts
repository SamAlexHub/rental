import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-products-outlet',
	template: ` <router-outlet></router-outlet> `,
	styles: [],
})
export class ProductsOutletComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
