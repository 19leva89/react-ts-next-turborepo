import type { Request, Response } from 'express'
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const request = ctx.getRequest<Request>()
		const response = ctx.getResponse<Response>()
		const status = exception.getStatus()
		const message = exception.getResponse()

		console.error(`HTTP Status: ${status}, Error Message: ${JSON.stringify(message)}`)

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: message,
		})
	}
}
