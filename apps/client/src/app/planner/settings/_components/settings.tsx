'use client'

import { useEffect } from 'react'
import { Button } from '@repo/ui/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, Resolver, SubmitHandler, useForm } from 'react-hook-form'

import { FormInput } from '@/components/forms'
import { useProfile } from '@/hooks/use-profile'
import { useUpdateSettings } from '../_hooks/use-update-settings'
import { TUserValues, UserSchema } from '@/components/forms/schemas'

export const Settings = () => {
	const { data } = useProfile()
	console.log(data?.user)

	const { isPending, mutate } = useUpdateSettings()

	const form = useForm<TUserValues>({
		resolver: zodResolver(UserSchema) as Resolver<TUserValues>,
		defaultValues: {
			email: '',
			name: '',
			password: '',
			workInterval: 5,
			breakInterval: 5,
			intervalsCount: 1,
		},
	})

	const onSubmit: SubmitHandler<TUserValues> = (data) => {
		const { password, ...rest } = data

		mutate({
			...rest,
			password: password || undefined,
		})
	}

	useEffect(() => {
		if (data?.user) {
			form.reset({
				email: data.user.email,
				name: data.user.name,
				password: '',
				workInterval: data.user.workInterval,
				breakInterval: data.user.breakInterval,
				intervalsCount: data.user.intervalsCount,
			})
		}
	}, [data, form])

	return (
		<FormProvider {...form}>
			<form className='m-6 flex w-2/4 flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 gap-10'>
					<div className='flex flex-col gap-4'>
						<FormInput name='email' type='email' label='Enter email' placeholder='test@email.com' required />

						<FormInput name='name' type='text' label='Enter name' placeholder='John Doe' />

						<FormInput name='password' type='password' label='Enter password' placeholder='Password' />
					</div>

					<div className='flex flex-col gap-4'>
						<FormInput
							name='workInterval'
							type='number'
							label='Enter work interval (min.)'
							placeholder='30'
							required
						/>

						<FormInput
							name='breakInterval'
							type='number'
							label='Enter break interval (min.)'
							placeholder='5'
							required
						/>

						<FormInput
							name='intervalsCount'
							type='number'
							label='Enter intervals count (max 10)'
							placeholder='5'
							required
						/>
					</div>
				</div>

				<Button type='submit' disabled={isPending}>
					Save
				</Button>
			</form>
		</FormProvider>
	)
}
