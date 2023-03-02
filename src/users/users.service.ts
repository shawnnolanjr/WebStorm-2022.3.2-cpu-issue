import { Injectable, Inject } from '@nestjs/common'
import { UsersInterface } from './interfaces/users.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { genSaltSync, hashSync } from 'bcrypt'
import { fromEvent } from 'rxjs'
import { EventEmitter } from 'events'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
	private saltRounds = 10
	private emitter: EventEmitter

	constructor(
		@Inject( 'USER_MODEL' ) private userModel: Model<UsersInterface>
	) {
		this.emitter = new EventEmitter()
	}

	async validateUserForLogin(Username: string): Promise<any> {
		try {
			return await this.userModel.findOne( { Username }, { _id: 1, Username: 1, Password: 1 } ).lean()
		} catch (err) {
			throw err
		}
	}

	async findOne(Id: string): Promise<any> {
		try {
			return await this.userModel
				.findOne( { _id: Id }, { Password: 0 } )
				.populate( [
					{
						path: 'Teams'
					},
					{
						path: 'Roles'
					}
				] )
				.lean()
		} catch (err) {
			throw err
		}
	}

	async findByUsername(Username: string): Promise<any> {
		try {
			return await this.userModel
				.findOne( { Username }, { Password: 0 } )
				.populate( [
					{
						path: 'Teams'
					},
					{
						path: 'Roles'
					}
				] )
				.lean()
		} catch (err) {
			throw err
		}
	}

	async findAll(): Promise<any> {
		try {
			return await this.userModel.find( {}, { Password: 0 } )
				.populate( [
					{
						path: 'Teams'
					},
					{
						path: 'Roles'
					}
				] )
				.lean()
		} catch (err) {
			throw err
		}
	}

	async create(createUserDto: CreateUserDto): Promise<any> {
		try {
			const salt = genSaltSync( this.saltRounds )
			createUserDto.Password = hashSync( createUserDto.Password, salt )
			await this.userModel.create( createUserDto )
			return await this.userModel.findOne( { Username: createUserDto?.Username } )
				.populate( [
					{
						path: 'Teams'
					},
					{
						path: 'Roles'
					}
				] )
				.lean()
		} catch (err) {
			throw err
		}
	}

	async addTeams(body: { Id: string, Teams: any[] }) {
		try {
			const { Id, Teams } = body
			const items = [ ...Teams, ...await this.getUserTeamIds( Id ) ]
			const teamIds = [ ...new Set( items ) ]
			return await this.userModel.updateOne( { _id: Id }, { Teams: teamIds } )
		} catch (err) {
			throw err
		}
	}

	async addRoles(body) {
		try {
			const { Id, Roles } = body
			return this.userModel.updateOne( { _id: Id }, { Roles } )
		} catch (err) {
			throw err
		}
	}

	subscribe(Id: string) {
		return fromEvent( this.emitter, `/events/user/${ Id }` )
	}

	async emit(data: any, Id: string) {
		this.emitter.emit( `/events/user/${ Id }`, data )
	}

	async getUserTeamIds(Id: string) {
		const { Teams } = await this.userModel.findOne( { _id: Id }, { Teams: 1 } )
			.populate( [
				{
					path: 'Teams'
				}
			] )
			.lean()
		return Teams.map( (res: any) => res?._id.toString() )
	}

	async getTeams(user: UsersInterface) {
		try {
			const { Teams } = await this.findOne( user?._id )
			return Teams
		} catch (err) {
			throw err
		}
	}
}