export interface Menu {
	link: string;
	icon?: string;
	label: string;
	expanded?: boolean;
	children?: Menu[];
}
