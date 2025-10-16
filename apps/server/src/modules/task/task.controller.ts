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

import { TaskDto } from './task.dto'
import { TaskService } from './task.service'
import { Auth } from 'src/modules/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/modules/auth/decorators/user.decorator'

@Controller('user/tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	// http://localhost:8000/api/user/tasks
	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.taskService.getAll(userId)
	}

	// http://localhost:8000/api/user/tasks
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: TaskDto, @CurrentUser('id') userId: string) {
		return this.taskService.create(dto, userId)
	}

	// http://localhost:8000/api/user/tasks/:id
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(@Body() dto: TaskDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.taskService.update(dto, id, userId)
	}

	// http://localhost:8000/api/user/tasks/:id
	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.taskService.delete(id)
	}
}
