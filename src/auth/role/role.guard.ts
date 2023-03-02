import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from '../constants'
import { UsersService } from '../../users/users.service'

@Injectable()
export class RoleGuard implements CanActivate {
	private jwtService: JwtService = new JwtService()

	constructor(private reflector: Reflector, private usersService: UsersService) {
	}

	matchRoles(roles: string[], userRoles: any[]) {
		return userRoles && !!roles.find( res => userRoles.find( res2 => res2 && res2.Name && res2.Name.includes( res ) ) )
	}

	async canActivate(
		context: ExecutionContext
	): Promise<boolean> {
		const roles = this.reflector.get<string[]>( 'Roles', context.getHandler() )
		if (!roles) return true
		const request = context.switchToHttp().getRequest()
		// @todo: better way of maybe handling this...
		const { authorization } = request?.headers
		if (!authorization) return false
		const token = authorization.replace( 'Bearer ', '' )
		const { Password, ...alteredUser } = this.jwtService.verify( token, { secret: jwtConstants.secret } )
		let user
		if (alteredUser?.Username) {
			user = await this.usersService.findByUsername( alteredUser?.Username )
		}
		return this.matchRoles( roles, user?.Roles )
	}
}