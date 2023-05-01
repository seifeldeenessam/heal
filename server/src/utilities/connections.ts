import { Application } from 'express';
import { Mongoose } from 'mongoose';

export async function databaseConnect(database: Mongoose) {
	try {
		database.set('strictQuery', false);
		await database.connect(`${process.env.DATABASE_URI}`, { dbName: process.env.DATABASE_NAME });
		console.log("✅  Database is connected successfully");
	} catch (error) {
		console.error("🚫  Error connecting to database\n", error);
	}
}

export function serverConnect(app: Application) {
	try {
		app.listen(process.env.PORT, () => console.log("✅  Server is connected successfully"));
	} catch (error) {
		console.error("🚫  Error starting the server\n", error);
	}
}