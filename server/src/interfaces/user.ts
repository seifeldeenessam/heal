import { Request, Response } from "express";
import { Document, Model, ObjectId } from "mongoose";
import { Gender } from "../types/gender";

export default interface IUser extends Document {
	_id?: ObjectId;
	__t?: string;
	name: string;
	email: string;
	phone: string;
	image: string;
	password: string;
	birthdate: Date;
	gender: Gender;
	createdAt?: Date;
	updatedAt?: Date;
	age(): number;
	signUp(req: Request, res: Response): Promise<Response | void>;
	signIn(req: Request, res: Response): Promise<Response | void>;
	signOut(req: Request, res: Response): Promise<void>;
}

export interface IUserModel extends Model<IUser> {
	signUp(req: Request, res: Response): Promise<void>;
	signIn(req: Request, res: Response): Promise<void>;
	signOut(req: Request, res: Response): Promise<void>;
}