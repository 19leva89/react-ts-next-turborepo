import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './modules/auth/auth.module'
import { TaskModule } from './modules/task/task.module'
import { UserModule } from './modules/user/user.module'
import { PomodoroModule } from './modules/pomodoro/pomodoro.module'
import { TimeBlockModule } from './modules/time-block/time-block.module'

import { HttpExceptionFilter } from './common/filters/http-exception.filter'

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, TaskModule, TimeBlockModule, PomodoroModule],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class AppModule {}
