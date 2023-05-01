import { BloodTypes } from "../types/blood-types";
import IUser from "./user";

export default interface IPatient extends IUser {
	diseases: string[];
	bloodType: BloodTypes;
}

