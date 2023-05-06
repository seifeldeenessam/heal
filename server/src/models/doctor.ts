import { Request, Response } from "express";
import IDoctor from "../interfaces/doctor";
import Review from "./review";
import User from "./user";

class Doctor extends User implements IDoctor {
	public specializations: string[];
	public address: { country: string; city: string; town: string; };
	public priceRange: { from: number; to: number; };
	public reviews?: Review[];

	constructor({ name, email, phone, image, password, birthdate, gender, type, signUp, specializations, address, priceRange }: IDoctor) {
		super({ name, email, phone, image, password, birthdate, gender, type, signUp });
		this.specializations = specializations;
		this.address = address;
		this.priceRange = priceRange;
	}

	async signUp(req: Request, res: Response): Promise<Response | void> {
		return await super.signUp(req, res, "DOCTOR");
	}
}

export default Doctor;