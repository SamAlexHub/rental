import { Role } from './role';

export interface UserResponse {
	status: boolean;
	message: string;
	data: UserData;
}

export interface UserData {
	access_token: string;
	refresh_token: string;
	user: User;
}

export interface User {
	role: Role;
	_id: string;
	email: string;
}
