import { Request, Response, Router } from 'express';
import upload from '../middlewares/multer';
import { Patient } from '../models/patient';

export const patientsRouter: Router = Router();

patientsRouter.get('/', async (req: Request, res: Response) => {
	try {
		const patients = await Patient.find({ __t: "Patient" });
		res.status(200).json(patients);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error: `${error}` });
	}
});

patientsRouter.post('/sign-up', upload.single("image"), async (req: Request, res: Response) => {
	try {
		await Patient.signUp(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error });
	}
});