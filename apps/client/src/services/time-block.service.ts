import {
	ITimeBlockResponse,
	TypeTimeBlockFormState
} from '@/types/time-block.types'

import { axiosWithAuth } from '@/api/interceptors'

class TimeBlockService {
	private PRIVATE_URL = '/user/time-blocks'

	async getTimeBlocks() {
		const response = await axiosWithAuth.get<ITimeBlockResponse[]>(
			this.PRIVATE_URL
		)
		return response
	}

	async createTimeBlock(data: TypeTimeBlockFormState) {
		const response = await axiosWithAuth.post(this.PRIVATE_URL, data)
		return response
	}

	async updateOrderTimeBlock(ids: string[]) {
		const response = await axiosWithAuth.put(
			`${this.PRIVATE_URL}/update-order`,
			{
				ids
			}
		)
		return response
	}

	async updateTimeBlock(id: string, data: TypeTimeBlockFormState) {
		const response = await axiosWithAuth.put(`${this.PRIVATE_URL}/${id}`, data)
		return response
	}

	async deleteTimeBlock(id: string) {
		const response = await axiosWithAuth.delete(`${this.PRIVATE_URL}/${id}`)
		return response
	}
}

export const timeBlockService = new TimeBlockService()
