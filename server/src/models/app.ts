import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
import appointmentsRouter from '../routers/appointments';
import doctorsRouter from '../routers/doctors';
import patientsRouter from '../routers/patients';
import usersRouter from '../routers/users';

class App {
	private express: Application;
	public client: MongoClient;

	constructor() {
		dotenv.config();
		this.express = express();
		this.client = new MongoClient(process.env.DATABASE_URI as string);
		this.loadCongratulations();
		this.loadRoutes();
	}

	private loadCongratulations(): void {
		this.express.use(express.json());
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: true }));
		this.express.use(cookieParser());
		this.express.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
	}

	private loadRoutes(): void {
		this.express.use('/appointments', appointmentsRouter);
		this.express.use('/doctors', doctorsRouter);
		this.express.use('/patients', patientsRouter);
		this.express.use('/users', usersRouter);
		this.express.use('/uploads', express.static(path.join(path.resolve(__dirname, '..'), 'uploads')));
	}

	async databaseConnect() {
		try {
			await this.client.connect();
			console.log("✅  Database is connected successfully");
		} catch (error) {
			console.error("🚫  Error connecting to database\n", error);
		}
	}

	serverConnect() {
		try {
			this.express.listen(process.env.PORT, () => console.log("✅  Server is connected successfully"));
		} catch (error) {
			console.error("🚫  Error starting the server\n", error);
		}
	}
}

export default new App();