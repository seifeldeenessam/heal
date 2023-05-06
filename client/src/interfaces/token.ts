import UserType from "../types/user-type";

export default interface Token {
	id: string;
	type: UserType;
	iat: Date;
	exp: Date;
}