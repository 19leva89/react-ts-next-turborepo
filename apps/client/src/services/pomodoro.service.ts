import {
	IPomodoroSessionResponse,
	TypePomodoroRoundState,
	TypePomodoroSessionState
} from '@/types/pomodoro.types'

import { axiosWithAuth } from '@/api/interceptors'

class PomodoroService {
	private PRIVATE_URL = '/user/timer'

	async getTodaySession() {
		const response = await axiosWithAuth.get<IPomodoroSessionResponse>(
			`${this.PRIVATE_URL}/today`
		)
		return response
	}

	async createSession() {
		const response = await axiosWithAuth.post<IPomodoroSessionResponse>(
			this.PRIVATE_URL
		)
		return response
	}

	async updateSession(id: string, data: TypePomodoroSessionState) {
		const response = await axiosWithAuth.put(`${this.PRIVATE_URL}/${id}`, data)
		return response
	}

	async deleteSession(id: string) {
		const response = await axiosWithAuth.delete(`${this.PRIVATE_URL}/${id}`)
		return response
	}

	async updateRound(id: string, data: TypePomodoroRoundState) {
		const response = await axiosWithAuth.put(
			`${this.PRIVATE_URL}/round/${id}`,
			data
		)
		return response
	}
}

export const pomodoroService = new PomodoroService()
