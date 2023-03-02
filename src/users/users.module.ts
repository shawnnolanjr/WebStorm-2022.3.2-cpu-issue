import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { MongoDbModule } from '../mongo-db/mongo-db.module'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '../auth/auth.service'
import { UsersProvider } from './users.provider';

@Module( {
	imports: [ MongoDbModule ],
	controllers: [ UsersController ],
	providers: [
		...UsersProvider,
		JwtService,
		AuthService,
		UsersService
	],
	exports: [UsersService, ...UsersProvider ]
} )
export class UsersModule {
}