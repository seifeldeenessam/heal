import { Gender } from "../types/gender";

export default interface IUser {
	_id?: string;
	__t?: string;
	name: string;
	email: string;
	phone: string;
	image: string;
	password: string;
	birthdate: Date;
	gender: Gender;
	createdAt?: Date;
	updatedAt?: Date;
}