import { RoleGuard } from './role.guard'
import { Reflector} from '@nestjs/core'
import { UsersService } from '../../users/users.service'
import { Model } from 'mongoose'

describe( 'RoleGuard', () => {
	it( 'should be defined', () => {
		expect( new RoleGuard(new Reflector, new UsersService(Model)) ).toBeDefined()
	} )
} )
