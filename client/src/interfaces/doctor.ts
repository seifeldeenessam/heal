import Review from "./review";
import IUser from "./user";

export default interface IDoctor extends IUser {
	specializations: string[];
	address: { country: string, city: string, town: string; };
	priceRange: { from: number; to: number; };
	reviews?: Review[];
}