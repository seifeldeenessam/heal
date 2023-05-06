import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Gender from "../types/gender";
import UserType from "../types/user-type";

export default interface IUser {
	_id?: ObjectId;
	name: string;
	email: string;
	phone: string;
	image: string;
	password: string;
	birthdate: Date;
	gender: Gender;
	type: UserType;
	createdAt?: Date;
	updatedAt?: Date;
	signUp(req: Request, res: Response, type: UserType): Promise<Response | void>;
	// TODO: Implement the following methods in the User class
	// signIn(req: Request, res: Response): Promise<Response | void>;
	// signOut(req: Request, res: Response): Promise<void>;
}