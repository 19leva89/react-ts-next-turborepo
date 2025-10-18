import cookieParser from 'cookie-parser'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')

	// Connecting cookie-parser
	app.use(cookieParser())

	app.enableCors({
		origin: [`${process.env.NEXT_PUBLIC_CLIENT_URL}`], // Port front
		credentials: true,
		exposedHeaders: ['Set-Cookie'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
	})

	// Port back
	await app.listen(process.env.PORT || process.env.SERVER_API_PORT || 8000)

	console.log(`Application is running on: ${await app.getUrl()}`)
}

// Export the bootstrap function for platforms that require it
export { bootstrap }

// Start the application if this file is run directly
if (require.main === module) {
	bootstrap().catch((err) => {
		console.error('Error during bootstrap:', err)

		process.exit(1)
	})
}
