import cookieParser from 'cookie-parser'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')

	// Connecting cookie-parser
	app.use(cookieParser())

	app.enableCors({
		origin: ['http://localhost:3000', 'https://react-ts-next-red-planner-trello.onrender.com'], // Port front
		credentials: true,
		exposedHeaders: ['Set-Cookie'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
	})

	// Port back
	await app.listen(process.env.SERVER_API_PORT || 8000)
}

bootstrap()
