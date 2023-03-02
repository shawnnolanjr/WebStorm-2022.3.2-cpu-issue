import * as mongoose from 'mongoose'

const uri = ''
const dbName = ''

export const databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: (): Promise<typeof mongoose> => mongoose.connect( uri, {
			dbName
		} )
	}
]