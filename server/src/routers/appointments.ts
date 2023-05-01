import { Request, Response, Router } from 'express';
import { Appointment } from '../models/appointment';

export const appointmentsRouter: Router = Router();

appointmentsRouter.post('/', async (req: Request, res: Response) => {
	try {
		await Appointment.create(req.body);
		res.status(202).json({ succeed: true, response: "Appointment created" });
	} catch (error) {
		res.status(500).json({ message: '[ERROR 02] Internal server error', error });
	}
});

appointmentsRouter.post('/respond', async (req: Request, res: Response) => {
	try {
		const id = req.body.id;
		const update = { cost: req.body.cost, status: req.body.status };
		const options = { new: true };
		await Appointment.findByIdAndUpdate(id, update, options);
		res.status(202).json({ succeed: true, response: "Appointment updated" });
	} catch (error) {
		res.status(500).json({ message: '[ERROR 02] Internal server error', error });
	}
});

appointmentsRouter.get('/doctor/:id', async (req: Request, res: Response) => {
	try {
		const appointments = await Appointment.find({ doctor: req.params.id }).populate('doctor').populate('patient');
		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error: `${error}` });
	}
});

appointmentsRouter.get('/patient/:id', async (req: Request, res: Response) => {
	try {
		const appointments = await Appointment.find({ patient: req.params.id }).populate('doctor').populate('patient');
		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ message: '[ERROR 01] Internal server error', error: `${error}` });
	}
});