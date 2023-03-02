import { Connection } from 'mongoose'
import { UserSchema } from './schemas/user.schema'

export const UsersProvider = [
	{
		provide: 'USER_MODEL',
		inject: [ 'DATABASE_CONNECTION' ],
		useFactory: (connection: Connection) => connection.model( 'users', UserSchema )
	}
]