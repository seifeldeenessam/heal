import AppointmentStatus from "../types/appointment-status";
import IDoctor from "./doctor";
import IPatient from "./patient";
import Review from "./review";

export default interface IAppointment {
	_id?: string;
	doctor: IDoctor;
	patient: IPatient;
	date: Date;
	status: AppointmentStatus;
	description: string;
	cost?: number;
	review?: Review;
	createdAt?: Date;
	updatedAt?: Date;
}