import { CookieOptions, Request, Response } from "express";
import { Model, Schema, model } from "mongoose";
import IUser, { IUserModel } from "../interfaces/user";
import { comparePasswords, hashPassword, strongPassword } from '../utilities/passwords';
import { createToken } from "../utilities/tokens";

const schema = new Schema({
	name: { type: String, required: true, trim: true },
	email: { type: String, required: true, unique: true, trim: true, lowercase: true },
	phone: { type: String, required: true, unique: true, sparse: true, trim: true },
	image: { type: String, required: true },
	password: { type: String, required: true },
	birthdate: { type: Date, required: true },
	gender: { type: String, enum: ["MALE", "FEMALE"], required: true },
}, { timestamps: true, versionKey: false });

schema.methods.age = function age(): number {
	const now = new Date();
	const diff = now.getTime() - this.birthdate.getTime();
	return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

schema.statics.signUp = async function signUp(req: Request, res: Response): Promise<Response | void> {
	const data = JSON.parse(req.body.data);

	// Checking for user's existance
	const existingUser = await this.findOne({ $or: [{ email: data.email }, { phone: data.phone }] }).exec();
	if (existingUser) return res.status(403).json({ succeed: false, response: "User is already existed" });

	// Checking if the password is strong
	const isStrongPassword: boolean = strongPassword(data.password);
	if (!isStrongPassword) return res.status(403).json({ succeed: false, response: "Password is too weak provide a stronger one" });

	// Hashing the password
	const hashedPassword: string = hashPassword(data.password);

	// Storing the user in the database
	const user = await this.create({ ...data, password: hashedPassword, image: req.file?.filename });

	// Creating a token and setting a `auth_token` cookie in the client
	const token: string = createToken(user._id.toString(), user.__t);
	const options: CookieOptions = { path: '/', domain: process.env.COOKIES_DOMAIN, maxAge: 1000 * 60 * 60 * 24 * 2, secure: true, sameSite: "lax" };
	res.status(202).cookie('auth_token', token, options).json({ succeed: true, response: "Sign up succeed" });
};

schema.statics.signIn = async function signIn(req: Request, res: Response): Promise<Response | void> {
	// Checking for user's existance
	const existingUser: IUser | null = await User.findOne({ email: req.body.email });
	if (!existingUser) return res.status(403).json({ succeed: false, response: "User is not existed" });

	// Checking if the provided and stored passwords match
	const validPassword: boolean = comparePasswords(req.body.password, existingUser.password);
	if (!validPassword) return res.status(403).json({ succeed: false, response: "Wrong credentials" });

	// Creating a token and setting a `auth_token` cookie in the client
	const token: string = createToken(existingUser._id!.toString(), existingUser.__t!);
	const options: CookieOptions = { path: '/', domain: process.env.COOKIES_DOMAIN, maxAge: 1000 * 60 * 60 * 24 * 2, secure: true, sameSite: "lax" };
	res.status(201).cookie('auth_token', token, options).json({ succeed: true, response: "Sign in succeed" });
};

schema.statics.signOut = async function signOut(req: Request, res: Response): Promise<void> {
	// Clearing the `auth_token` cookie in the client
	res.status(200).clearCookie('auth_token').json({ succeed: true, response: "Sign out succeed" });
};

export const User = model<IUser | IUserModel>('User', schema) as Model<IUser> & IUserModel;