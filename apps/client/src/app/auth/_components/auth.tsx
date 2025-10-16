'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/components'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Field } from '@/components/ui/field/Field'
import { Heading } from '@/components/ui/heading'

import { authService } from '@/services/auth.service'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { AxiosServerError, IAuthForm, ServerError } from '@/types/auth.types'

export const Auth = () => {
	const { push } = useRouter()
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange',
	})

	const [isLoginForm, setIsLoginForm] = useState<boolean>(false)

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfully login!')

			reset()
			push(DASHBOARD_PAGES.HOME)
		},
		onError(error: unknown) {
			const axiosError = error as AxiosServerError
			const serverError = error as ServerError

			// Еry to receive a message from different sources
			const errorMessage = axiosError.response?.data?.message?.message || serverError.message?.message

			// Process different message formats
			let finalMessage = 'An unknown error occurred'

			if (errorMessage) {
				if (Array.isArray(errorMessage)) {
					finalMessage = errorMessage[0] || 'An unknown error occurred'
				} else if (typeof errorMessage === 'string') {
					finalMessage = errorMessage
				}
			}

			// Fallbacks for other possible options
			if (finalMessage === 'An unknown error occurred') {
				if (typeof serverError.message === 'string') {
					finalMessage = serverError.message
				} else if (typeof axiosError.response?.data?.message === 'string') {
					finalMessage = axiosError.response.data.message
				} else if (typeof (error as Error).message === 'string') {
					finalMessage = (error as Error).message
				}
			}

			toast.error(finalMessage)
		},
	})

	const onSubmit: SubmitHandler<IAuthForm> = (data) => {
		mutate(data)
	}

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='bg-sidebar m-2 w-full rounded-xl p-4 shadow-sm sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4'
			>
				<Heading title='Auth' />

				<Field
					id='email'
					label='Email:'
					placeholder='Enter email:'
					type='email'
					extra='mb-4'
					{...register('email', {
						required: 'Email is required!',
					})}
				/>

				<Field
					id='password'
					label='Password: '
					placeholder='Enter password: '
					type='password'
					{...register('password', {
						required: 'Password is required!',
					})}
					extra='mb-6'
				/>

				<div className='flex items-center justify-center gap-5'>
					<Button onClick={() => setIsLoginForm(true)}>Login</Button>

					<Button onClick={() => setIsLoginForm(false)}>Register</Button>
				</div>
			</form>
		</div>
	)
}
