import { Document } from 'mongoose'

export interface UsersInterface extends Document {
	readonly _id: string
	readonly Username: string
	readonly Email: string
	readonly Created: Date
	readonly Teams: any[]
	readonly Roles: any[]
}