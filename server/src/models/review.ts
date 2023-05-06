import { ObjectId } from "mongodb";
import IReview from "src/interfaces/review";

class Review implements IReview {
	public _id?: ObjectId;
	public patientId: ObjectId;
	public doctorId: ObjectId;
	public comment: string;
	public rate: number;
	public createdAt?: Date;
	public updatedAt?: Date;

	constructor({ patientId, doctorId, comment, rate }: IReview) {
		this.patientId = patientId;
		this.doctorId = doctorId;
		this.comment = comment;
		this.rate = rate;
	}

	// create(req: Request, res: Response): Promise<Response | void> {}
}

export default Review;