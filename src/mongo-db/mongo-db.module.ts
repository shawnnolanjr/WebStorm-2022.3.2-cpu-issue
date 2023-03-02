import { Module, Inject } from '@nestjs/common'
import { databaseProviders } from './mongo-db'

@Module( {
	providers: [ ...databaseProviders ],
	exports: [ ...databaseProviders ]
} )
export class MongoDbModule {
}