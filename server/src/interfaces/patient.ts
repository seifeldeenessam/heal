import Review from "../models/review";
import BloodType from "../types/blood-type";
import IUser from "./user";

export default interface IPatient extends IUser {
	diseases: string[];
	bloodType: BloodType;
	reviews?: Review[];
}