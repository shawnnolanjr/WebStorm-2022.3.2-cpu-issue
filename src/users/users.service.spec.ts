import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { UsersProvider } from './users.provider'
import { databaseProviders } from '../mongo-db/mongo-db'

describe( 'UsersService', () => {
	let service: UsersService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ ...databaseProviders, ...UsersProvider, UsersService ]
		} ).compile()

		service = module.get<UsersService>( UsersService )
	} )

	it( 'should be defined', () => {
		expect( service ).toBeDefined()
	} )
} )