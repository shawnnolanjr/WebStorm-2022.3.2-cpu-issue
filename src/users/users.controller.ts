import { Controller, Get, BadRequestException } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { UsersService } from './users.service'

@Controller( 'users' )
export class UsersController {
	constructor(
		private authService: AuthService,
		private userService: UsersService
	) {
	}
	
	@Get( '' )
	async getUsers() {
		try {
			return await this.userService.findAll()
		} catch (err) {
			return new BadRequestException(err)
		}
	}

}