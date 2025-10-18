import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'

import { PomodoroService } from './pomodoro.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { PomodoroRoundDto, PomodoroSessionDto } from './pomodoro.dto'

@Controller('user/timer')
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {}

	// http://localhost:8000/api/user/timer/today
	@Get('today')
	@Auth()
	async getTodaySession(@CurrentUser('id') userId: string) {
		return this.pomodoroService.getTodaySession(userId)
	}

	// http://localhost:8000/api/user/timer
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser('id') userId: string) {
		return this.pomodoroService.create(userId)
	}

	// http://localhost:8000/api/user/timer/round/:id
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('/round/:id')
	@Auth()
	async updateRound(@Param('id') id: string, @Body() dto: PomodoroRoundDto) {
		return this.pomodoroService.updateRound(dto, id)
	}

	// http://localhost:8000/api/user/timer/:id
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(@Body() dto: PomodoroSessionDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.pomodoroService.update(dto, id, userId)
	}

	// http://localhost:8000/api/user/timer/:id
	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteSession(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.pomodoroService.deleteSession(id, userId)
	}
}
