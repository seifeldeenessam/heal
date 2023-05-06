import { Request, Response, Router } from 'express';
import Patient from '../models/patient';
import User from '../models/user';
import MulterUtilities from '../utilities/multer';

const router: Router = Router();

router.post('/sign-up', new MulterUtilities().uplaod.single("image"), async (req: Request, res: Response) => {
	try {
		await new Patient(JSON.parse(req.body.data)).signUp(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error });
	}
});

router.get('/', async (req: Request, res: Response) => {
	try {
		await User.getAll(req, res, "PATIENT");
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error: `${error}` });
	}
});

export default router;