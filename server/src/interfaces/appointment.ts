import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Review from "../models/review";
import AppointmentStatus from "../types/appointment-status";

export default interface IAppointment {
	_id?: ObjectId;
	doctor: ObjectId;
	patient: ObjectId;
	date: Date;
	status: AppointmentStatus;
	description: string;
	cost?: number;
	review?: Review;
	createdAt?: Date;
	updatedAt?: Date;
	create(req: Request, res: Response): Promise<Response | void>;
}