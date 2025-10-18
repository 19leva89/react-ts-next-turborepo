import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { getJwtConfig } from '@/config/jwt.config'
import { UserModule } from '@/modules/user/user.module'
import { AuthService } from '@/modules/auth/auth.service'
import { JwtStrategy } from '@/modules/auth/jwt.strategy'
import { AuthController } from '@/modules/auth/auth.controller'

@Module({
	imports: [
		UserModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
