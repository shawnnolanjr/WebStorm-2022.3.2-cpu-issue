import { Test, TestingModule } from '@nestjs/testing'
import { databaseProviders } from './mongo-db'
import mongoose from 'mongoose'
import { MongoDbModule } from './mongo-db.module'

describe( 'databaseProviders', () => {
	let provider: MongoDbModule

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ ...databaseProviders ],
			imports: [ MongoDbModule ]
		} ).compile()

		provider = module.get<MongoDbModule>( MongoDbModule )
	} )

	it( 'should be defined', () => {
		expect( provider ).toBeDefined()
	} )
} )