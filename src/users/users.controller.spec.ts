import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { AuthService } from '../auth/auth.service'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from './users.service'
import { UsersProvider } from './users.provider'
import { databaseProviders } from '../mongo-db/mongo-db'

describe( 'UsersController', () => {
	let controller: UsersController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ UsersController ],
			providers: [
				AuthService,
				UsersService,
				JwtService,
				...databaseProviders,
				...UsersProvider
			]
		} ).compile()

		controller = module.get<UsersController>( UsersController )
	} )

	it( 'should be defined', () => {
		expect( controller ).toBeDefined()
	} )
} )