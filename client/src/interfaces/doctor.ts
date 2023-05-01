import IUser from "./user";

export default interface IDoctor extends IUser {
	specializations: string[];
	address: string;
	priceRange: { from: number; to: number; };
	rating: number;
}