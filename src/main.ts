import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		forceCloseConnections: true
	})
	app.enableShutdownHooks()
	// whitelist ips
	const whitelist = []
	app.enableCors({
		origin: function (origin, callback) {
			if (!origin || whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		}
	})
	await app.listen(process.env.PORT || 8080)
}

bootstrap()