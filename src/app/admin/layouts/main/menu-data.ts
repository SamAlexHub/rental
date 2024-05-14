import { Menu } from 'src/app/core/models/menu';

export const MenuData: Menu[] = [
	{
		link: 'dashboard',
		icon: 'fa-light fa-grid-2',
		label: 'Dashboard',
	},
	{
		link: '',
		icon: 'fa-light fa-briefcase',
		label: 'Products',
		children: [
			{
				link: 'products/product-category',
				icon: '',
				label: 'Product Category',
			},
			{
				link: 'products/product-rent',
				icon: '',
				label: 'Product Rent',
			},
			{
				link: 'products/stock',
				icon: '',
				label: 'Stock',
			},
		],
	},
	{
		link: '',
		icon: 'fa-light fa-building-lock',
		label: 'Administration',
		children: [
			{
				link: 'administration/branches',
				icon: '',
				label: 'Branches',
			},
		],
	},
];