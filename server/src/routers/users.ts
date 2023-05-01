import { Request, Response, Router } from 'express';
import { User } from '../models/user';

export const usersRouter: Router = Router();

usersRouter.post('/sign-in', async (req: Request, res: Response) => {
	try {
		await User.signIn(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 02] Internal server error', error });
	}
});

usersRouter.get('/sign-out', async (req: Request, res: Response) => {
	try {
		await User.signOut(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 03] Internal server error', error: `${error}` });
	}
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 03] Internal server error', error: `${error}` });
	}
});
