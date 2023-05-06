import { ObjectId } from "mongodb";

export default interface IReview {
	_id?: ObjectId;
	patientId: ObjectId;
	doctorId: ObjectId;
	comment: string;
	rate: number;
	createdAt?: Date;
	updatedAt?: Date;
}