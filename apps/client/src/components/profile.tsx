'use client'

import { Spinner } from '@repo/ui/components'

import { useProfile } from '@/hooks'
import { LogoutButton } from '@/components'

export const Profile = () => {
	const { data, isLoading } = useProfile()

	if (isLoading) {
		return (
			<div className='mx-2 my-2.5 flex w-full items-center justify-center'>
				<Spinner className='size-5' />
			</div>
		)
	}

	return (
		<div className='mx-2 flex items-center gap-3'>
			<div className='text-right'>
				<p className='font-bold'>{data?.user.name}</p>

				<p className='text-sm opacity-40'>{data?.user.email}</p>
			</div>

			<div className='flex size-10 items-center justify-center rounded-md border text-2xl uppercase'>
				{data?.user.name?.charAt(0) || 'U'}
			</div>

			<LogoutButton />
		</div>
	)
}
