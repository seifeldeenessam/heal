import { Request, Response, Router } from 'express';
import Doctor from '../models/doctor';
import User from '../models/user';
import MulterUtilities from '../utilities/multer';

const router: Router = Router();

router.post('/', new MulterUtilities().uplaod.single("image"), async (req: Request, res: Response) => {
	try {
		new Doctor(JSON.parse(req.body.data)).signUp(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error: `${error}` });
	}
});

router.get('/', async (req: Request, res: Response) => {
	try {
		await User.getAll(req, res, "DOCTOR");
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error: `${error}` });
	}
});

export default router;