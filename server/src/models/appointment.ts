import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import IAppointment from "src/interfaces/appointment";
import AppointmentStatus from "src/types/appointment-status";
import App from "./app";
import Review from "./review";

class Appointment implements IAppointment {
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

	constructor({ doctor, patient, date, status, description }: IAppointment) {
		this.doctor = doctor;
		this.patient = patient;
		this.date = date;
		this.status = status;
		this.description = description;
	}

	async create(req: Request, res: Response): Promise<Response | void> {
		const collection = App.client.db(process.env.DATABASE_NAME).collection("appointments");
		await collection.insertOne({ ...this, doctor: new ObjectId(this.doctor), patient: new ObjectId(this.patient) });
		res.status(202).json({ succeed: true, response: "Appointment created" });
	}

	static async respond(req: Request, res: Response): Promise<Response | void> {
		const collection = App.client.db(process.env.DATABASE_NAME).collection("appointments");
		const _id = req.body._id;
		const update = { cost: req.body.cost, status: req.body.status };
		await collection.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: update });
		res.status(202).json({ succeed: true, response: "Appointment updated" });
	}

	static async review(req: Request, res: Response): Promise<Response | void> {
		const collection = App.client.db(process.env.DATABASE_NAME).collection("appointments");
		const _id = req.body._id;
		const update = { review: { comment: req.body.comment, rate: req.body.rate } };
		await collection.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: update });
		res.status(202).json({ succeed: true, response: "Review created" });
	}

	static async getAll(req: Request, res: Response): Promise<Response | void> {
		const { document, id } = req.query;
		const collection = App.client.db(process.env.DATABASE_NAME).collection("appointments");
		const appointments = await collection.aggregate([
			{ $match: { [document!.toString()]: new ObjectId(id!.toString()) } },
			{ $lookup: { from: "users", localField: "doctor", foreignField: "_id", as: "doctor" } },
			{ $lookup: { from: "users", localField: "patient", foreignField: "_id", as: "patient" } },
			{ $unwind: "$doctor" },
			{ $unwind: "$patient" },
		]).toArray();
		res.status(200).json(appointments);
	}
}

export default Appointment;