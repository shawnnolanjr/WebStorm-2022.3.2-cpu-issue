export class CreateUserDto {
	readonly Username: string
	Password: string
	readonly Email: string
	readonly Teams: any[]
	readonly Roles: any[]
}