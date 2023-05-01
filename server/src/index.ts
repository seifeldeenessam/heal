import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { appointmentsRouter } from './routers/appointments';
import { doctorsRouter } from './routers/doctors';
import { patientsRouter } from './routers/patients';
import { usersRouter } from './routers/users';
import { databaseConnect, serverConnect } from './utilities/connections';

async function main() {
	const app: Application = express();

	// Server middlewares
	dotenv.config();
	app.use(express.json());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

	// Server routers
	app.use('/appointments', appointmentsRouter);
	app.use('/doctors', doctorsRouter);
	app.use('/patients', patientsRouter);
	app.use('/users', usersRouter);
	app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

	// Establishing connections
	await databaseConnect(mongoose);
	serverConnect(app);
}

main();