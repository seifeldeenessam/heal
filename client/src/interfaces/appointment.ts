import IDoctor from "./doctor";
import IPatient from "./patient";

export default interface IAppointment {
	_id?: string;
	doctor: IDoctor;
	patient: IPatient;
	date: Date;
	status: "PENDDING" | "CONFIRMED" | "DONE" | "CANCELED";
	description: string;
	cost?: number;
	review?: { rate: number; comment: string; };
	createdAt?: Date;
	updatedAt?: Date;
}