import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

import { axiosWithAuth } from '@/api/interceptors'

class TaskService {
	private PRIVATE_URL = '/user/tasks'

	async getTasks() {
		const response = await axiosWithAuth.get<ITaskResponse[]>(this.PRIVATE_URL)
		return response
	}

	async createTask(data: TypeTaskFormState) {
		const response = await axiosWithAuth.post(this.PRIVATE_URL, data)
		return response
	}

	async updateTask(id: string, data: TypeTaskFormState) {
		const response = await axiosWithAuth.put(`${this.PRIVATE_URL}/${id}`, data)
		return response
	}

	async deleteTask(id: string) {
		const response = await axiosWithAuth.delete(`${this.PRIVATE_URL}/${id}`)
		return response
	}
}

export const taskService = new TaskService()
