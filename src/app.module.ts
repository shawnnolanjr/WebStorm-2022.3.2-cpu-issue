import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { UsersController } from './users/users.controller'
// import { ConfigModule } from '@nestjs/config'
import { MongoDbModule } from './mongo-db/mongo-db.module'
import { EventsService } from './events/events.service'
import { EventsController } from './events/events.controller'
import { UsersService } from './users/users.service'
import { JwtService } from '@nestjs/jwt'

@Module( {
	imports: [
		// @todo: look into ConfigModule
		// ConfigModule.forRoot(),
		AuthModule,
		UsersModule,
		MongoDbModule
	],
	exports: [
		AuthModule
	],
	controllers: [
		AppController,
		UsersController,
		EventsController
	],
	providers: [
		JwtService,
		AppService,
		EventsService,
		UsersService
	]
} )
export class AppModule {
}
