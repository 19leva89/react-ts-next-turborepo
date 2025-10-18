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

import { TimeBlockDto } from './dto/time-block.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { TimeBlockService } from './time-block.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'

@Controller('user/time-blocks')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}

	// http://localhost:8000/api/user/time-blocks
	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.timeBlockService.getAll(userId)
	}

	// http://localhost:8000/api/user/time-blocks
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: TimeBlockDto, @CurrentUser('id') userId: string) {
		return this.timeBlockService.create(dto, userId)
	}

	// http://localhost:8000/api/user/time-blocks/update-order
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('update-order')
	@Auth()
	updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
		return this.timeBlockService.updateOrder(updateOrderDto.ids)
	}

	// http://localhost:8000/api/user/time-blocks/:id
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(@Body() dto: TimeBlockDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.timeBlockService.update(dto, id, userId)
	}

	// http://localhost:8000/api/user/time-blocks/:id
	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.timeBlockService.delete(id, userId)
	}
}
