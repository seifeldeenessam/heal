import Gender from "../types/gender";
import UserType from "../types/user-type";

export default interface IUser {
	_id?: string;
	name: string;
	email: string;
	phone: string;
	image: string;
	password: string;
	birthdate: Date;
	gender: Gender;
	type: UserType;
	createdAt?: Date;
	updatedAt?: Date;
}