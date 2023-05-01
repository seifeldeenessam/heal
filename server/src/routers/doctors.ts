import { Request, Response, Router } from 'express';
import upload from '../middlewares/multer';
import { Doctor } from '../models/doctor';

export const doctorsRouter: Router = Router();

doctorsRouter.get('/', async (req: Request, res: Response) => {
	try {
		const doctors = await Doctor.find({ __t: "Doctor" });
		res.status(200).json(doctors);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error: `${error}` });
	}
});

doctorsRouter.post('/sign-up', upload.single("image"), async (req: Request, res: Response) => {
	try {
		await Doctor.signUp(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error: `${error}` });
	}
});