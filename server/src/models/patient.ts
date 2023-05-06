import { Request, Response } from "express";
import IPatient from "../interfaces/patient";
import BloodType from "../types/blood-type";
import Review from "./review";
import User from "./user";

class Patient extends User implements IPatient {
	public diseases: string[];
	public bloodType: BloodType;
	public reviews?: Review[];

	constructor({ name, email, phone, image, password, birthdate, gender, type, signUp, diseases, bloodType }: IPatient) {
		super({ name, email, phone, image, password, birthdate, gender, type, signUp });
		this.diseases = diseases;
		this.bloodType = bloodType;
	}

	async signUp(req: Request, res: Response): Promise<Response | void> {
		return await super.signUp(req, res, "PATIENT");
	}
}

export default Patient;