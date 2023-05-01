import { Model, Schema } from "mongoose";
import IDoctor from "../interfaces/doctor";
import { IUserModel } from "../interfaces/user";
import { User } from "./user";

const schema = new Schema({
	specializations: { type: [String], trim: true },
	address: { type: String, trim: true },
	priceRange: { from: { type: Number }, to: { type: Number } },
	rating: { type: Number, required: true, default: 0 },
}, { timestamps: true, versionKey: false });

schema.methods.setRating = function setRating(rating: number): void {
	this.rating = rating;
};

export const Doctor = User.discriminator<IDoctor>('Doctor', schema) as Model<IDoctor> & IUserModel;