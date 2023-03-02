import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { databaseProviders } from '../mongo-db/mongo-db'
import { UsersProvider } from '../users/users.provider'

describe( 'AuthService', () => {
	let service: AuthService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ ...databaseProviders, ...UsersProvider, AuthService, UsersService, JwtService ]
		} ).compile()

		service = module.get<AuthService>( AuthService )
	} )

	it( 'should be defined', () => {
		expect( service ).toBeDefined()
	} )
} )