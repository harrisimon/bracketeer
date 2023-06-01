import { Timestamp } from "mongodb"
import { Schema, model } from "mongoose"
import { UserType } from '../../types'

const UserSchema: Schema = new Schema<UserType>({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	hashedPassword: {
		type: String,
		required: true,
	},
	token: String,
})

export const User = model<UserType>("user", UserSchema)
