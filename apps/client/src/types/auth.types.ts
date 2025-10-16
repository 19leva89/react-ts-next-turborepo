export interface IAuthForm {
	email: string
	password: string
}

export interface IUser {
	id: number
	name?: string
	email: string

	workInterval?: number
	breakInterval?: number
	intervalsCount?: number
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export interface ServerError {
	statusCode?: number
	message?: {
		message?: string | string[]
		error?: string
	}
}

export interface AxiosServerError {
	response?: {
		data?: ServerError
	}
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
