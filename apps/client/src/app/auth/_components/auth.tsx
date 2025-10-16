'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/components'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, Resolver, SubmitHandler, useForm } from 'react-hook-form'

import { FormInput } from '@/components/forms'
import { Heading } from '@/components/ui/heading'
import { authService } from '@/services/auth.service'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { AxiosServerError, ServerError } from '@/types/auth.types'
import { AuthSchema, TAuthValues } from '@/components/forms/schemas'

export const Auth = () => {
	const router = useRouter()

	const [isLoginForm, setIsLoginForm] = useState<boolean>(false)

	const form = useForm<TAuthValues>({
		resolver: zodResolver(AuthSchema) as Resolver<TAuthValues>,
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: TAuthValues) => authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfully login!')

			router.push(DASHBOARD_PAGES.HOME)
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

	const onSubmit: SubmitHandler<TAuthValues> = (data) => {
		mutate(data)
	}

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='bg-sidebar m-2 w-full rounded-xl p-4 shadow-sm sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4'
				>
					<div className='flex grow flex-col items-stretch justify-between gap-2 py-3 md:gap-4 md:py-6'>
						<Heading title='Auth' />

						<FormInput name='email' type='email' placeholder='Email' required />

						<FormInput name='password' type='password' placeholder='Password' required />

						<div className='mt-4 flex items-center justify-center gap-5'>
							<Button onClick={() => setIsLoginForm(true)}>Login</Button>

							<Button onClick={() => setIsLoginForm(false)}>Register</Button>
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
