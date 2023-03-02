import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const UserSchema = new Schema( {
	Id: ObjectId,
	Username: {
		type: String,
		required: true,
		unique: true
	},
	Password: String,
	Email: {
		type: String,
		required: true,
		unique: true
	},
	Created: { type: Date, default: Date.now },
	Teams: [ { type: ObjectId, ref: 'teams'} ],
	Roles: [ { type: ObjectId, ref: 'roles'} ]
} )