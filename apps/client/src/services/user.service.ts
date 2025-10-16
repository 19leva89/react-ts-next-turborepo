import { IUser, TypeUserForm } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IProfileResponse {
	user: IUser
	statistics: {
		label: string
		value: string
	}[]
}

class UserService {
	private PRIVATE_URL = '/user/profile'

	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(this.PRIVATE_URL)
		return response.data
	}

	async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put(this.PRIVATE_URL, data)
		return response.data
	}
}

export const userService = new UserService()
