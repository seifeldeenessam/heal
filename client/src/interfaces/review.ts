export default interface Review {
	_id?: string;
	patientId: string;
	doctorId: string;
	comment: string;
	rate: number;
	createdAt?: Date;
	updatedAt?: Date;
}