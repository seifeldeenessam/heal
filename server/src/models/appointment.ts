import { Schema, model } from "mongoose";
import IAppointment from "../interfaces/appointment";

const schema = new Schema({
	doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
	patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
	date: { type: Date, required: true },
	status: { type: String, enum: ["PENDDING", "CONFIRMED", "DONE", "CANCELED"], required: true },
	description: { type: String, trim: true },
	cost: { type: Number },
	review: { rate: { type: Number }, comment: { type: String } },
}, { timestamps: true, versionKey: false });

export const Appointment = model<IAppointment>('Appointment', schema);