import { Request, Response, Router } from 'express';
import Appointment from '../models/appointment';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		await new Appointment(req.body).create(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error });
	}
});

router.post('/respond', async (req: Request, res: Response) => {
	try {
		await Appointment.respond(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 02] Internal server error', error });
	}
});

router.post('/review', async (req: Request, res: Response) => {
	try {
		await Appointment.review(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 02] Internal server error', error });
	}
});

router.get('/', async (req: Request, res: Response) => {
	try {
		await Appointment.getAll(req, res);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 03] Internal server error', error: `${error}` });
	}
});

export default router;