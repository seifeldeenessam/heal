import BloodType from "../types/blood-type";
import Review from "./review";
import IUser from "./user";

export default interface IPatient extends IUser {
	diseases: string[];
	bloodType: BloodType;
	reviews?: Review[];
}

