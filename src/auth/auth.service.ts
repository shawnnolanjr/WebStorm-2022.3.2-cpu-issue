import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {
	}

	async validateUser(username: string, pass: string): Promise<any> {
		const user: any = await this.usersService.validateUserForLogin( username )
		if (user) {
			const compares = await compare( pass, user.Password )
			if (compares) return user
		}
		return null
	}

	async login(user: any) {
		return { access_token: this.jwtService.sign( { ...user } ) }
	}
}