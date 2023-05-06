import { Request, Response, Router } from 'express';
import User from '../models/user';

const router: Router = Router();

router.post('/sign-in', async (req: Request, res: Response) => {
	try {
		await User.signIn(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error });
	}
});

router.get('/sign-out', (req: Request, res: Response) => {
	try {
		User.signOut(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 02] Internal server error', error: `${error}` });
	}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		await User.getOne(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 03] Internal server error', error: `${error}` });
	}
});

export default router;