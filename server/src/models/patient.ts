import { Model, Schema } from "mongoose";
import IPatient from "../interfaces/patient";
import { IUserModel } from "../interfaces/user";
import { User } from "./user";

const schema = new Schema({
	diseases: { type: [String], trim: true },
	bloodType: { type: String, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
}, { timestamps: true, versionKey: false });

export const Patient = User.discriminator<IPatient>('Patient', schema) as Model<IPatient> & IUserModel;