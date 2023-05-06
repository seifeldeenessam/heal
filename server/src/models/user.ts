import { CookieOptions, Request, Response } from "express";
import { ObjectId } from "mongodb";
import IUser from "../interfaces/user";
import Gender from "../types/gender";
import UserType from "../types/user-type";
import PasswordUtilities from '../utilities/password';
import TokenUtilities from "../utilities/token";
import App from "./app";

abstract class User implements IUser {
	public _id?: ObjectId;
	public name: string;
	public email: string;
	public phone: string;
	public image: string;
	public password: string;
	public birthdate: Date;
	public gender: Gender;
	public type: UserType;
	public createdAt?: Date;
	public updatedAt?: Date;

	constructor({ name, email, phone, image, password, birthdate, gender, type }: IUser) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.image = image;
		this.password = password;
		this.birthdate = birthdate;
		this.gender = gender;
		this.type = type;
	}

	async signUp(req: Request, res: Response, type: UserType): Promise<Response | void> {
		const collection = App.client.db(process.env.DATABASE_NAME).collection("users");
		const existingUser = await collection.findOne({ $or: [{ email: this.email }, { phone: this.phone }] });
		if (existingUser) return res.status(403).json({ succeed: false, response: "User is already existed" });
		const isStrongPassword: boolean = PasswordUtilities.strongPassword(this.password);
		if (!isStrongPassword) return res.status(403).json({ succeed: false, response: "Password is too weak provide a stronger one" });
		const hashedPassword: string = PasswordUtilities.hashPassword(this.password);
		const user = await collection.insertOne({ ...this, password: hashedPassword, image: req.file?.filename, type });
		const token: string = TokenUtilities.createToken(user.insertedId.toString(), type);
		const options: CookieOptions = { path: '/', domain: process.env.COOKIES_DOMAIN, maxAge: 1000 * 60 * 60 * 24 * 2, secure: true, sameSite: "lax" };
		res.status(202).cookie('auth_token', token, options).json({ succeed: true, response: "Sign up succeed" });
	};

	static async signIn(req: Request, res: Response): Promise<Response | void> {
		const collection = App.client.db(process.env.DATABASE_NAME).collection("users");
		const existingUser = await collection.findOne({ email: req.body.email });
		if (!existingUser) return res.status(403).json({ succeed: false, response: "User is not existed" });
		const validPassword: boolean = PasswordUtilities.comparePasswords(req.body.password, existingUser.password);
		if (!validPassword) return res.status(403).json({ succeed: false, response: "Wrong credentials" });
		const token: string = TokenUtilities.createToken(existingUser._id!.toString(), existingUser.type);
		const options: CookieOptions = { path: '/', domain: process.env.COOKIES_DOMAIN, maxAge: 1000 * 60 * 60 * 24 * 2, secure: true, sameSite: "lax" };
		res.status(201).cookie('auth_token', token, options).json({ succeed: true, response: "Sign in succeed" });
	};

	static signOut(req: Request, res: Response): void {
		res.status(200).clearCookie('auth_token').json({ succeed: true, response: "Sign out succeed" });
	}

	static async getOne(req: Request, res: Response): Promise<Response | void> {
		const collection = App.client.db(process.env.DATABASE_NAME).collection("users");
		const user = await collection.findOne({ _id: new ObjectId(req.params.id) });
		if (!user) return res.status(403).json({ succeed: false, response: "User is not existed" });
		res.status(200).json(user);
	}

	static async getAll(req: Request, res: Response, type: UserType): Promise<Response | void> {
		const collection = App.client.db(process.env.DATABASE_NAME).collection("users");
		const users = await collection.find({ type }).toArray();
		res.status(200).json(users);
	}
}

export default User;