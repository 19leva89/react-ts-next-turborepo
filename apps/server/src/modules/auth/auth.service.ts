import { verify } from 'argon2'
import type { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { AuthDto } from './dto/auth.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(
		private jwt: JwtService,
		private userService: UserService,
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = this.issueTokens(user.id)

		return { user, ...tokens }
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userService.getByEmail(dto.email)
		if (oldUser) throw new BadRequestException('User already exists')

		const user = await this.userService.create(dto)

		const tokens = this.issueTokens(user.id)

		return { user, ...tokens }
	}

	async getNewTokens(refreshToken: string) {
		console.log('Received refresh token server:', refreshToken)

		const result = await this.jwt.verifyAsync(refreshToken)

		console.log('Refresh token is valid on server, payload:', result)
		if (!result) throw new UnauthorizedException('Invalid refresh token')

		const user = await this.userService.getById(result.id)

		const tokens = this.issueTokens(user.id)

		console.log('New tokens issued on server:', tokens)

		return { user, ...tokens }
	}

	private issueTokens(userId: string) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, { expiresIn: '1h' })

		const refreshToken = this.jwt.sign(data, { expiresIn: '7d' })

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)
		if (!user) throw new NotFoundException('User not found')

		const isValid = await verify(user.password, dto.password)
		if (!isValid) throw new UnauthorizedException('Invalid password')

		return user
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		console.log('Adding refresh token to response:', refreshToken)

		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: process.env.COOKIE_DOMAIN,
			expires: expiresIn,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // lax if production
		})

		console.log('Refresh token added to cookies')
	}

	removeRefreshTokenFromResponse(res: Response) {
		console.log('Removing refresh token from response')

		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: process.env.COOKIE_DOMAIN,
			expires: new Date(0),
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // lax if production
		})

		console.log('Refresh token removed')
	}
}
