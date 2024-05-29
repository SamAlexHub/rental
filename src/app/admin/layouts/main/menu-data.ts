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
		label: 'Inventory',
		children: [
			{
				link: 'products/product-category',
				icon: '',
				label: 'Product Category',
			},
			{
				link: 'products/inventory',
				icon: '',
				label: 'Products',
			},
			{
				link: 'products/bookings',
				icon: '',
				label: 'Bookings',
			},
			{
				link: 'products/customer',
				icon: '',
				label: 'Customers',
			},
		],
	},
	
];
