'use client'

import { Loader } from '@/components/ui/loader'
import { useProfile } from '@/hooks/use-profile'

export const Profile = () => {
	const { data, isLoading } = useProfile()

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<div className='flex items-center'>
					<div className='mr-3 text-right'>
						<p className='-mb-1 font-bold'>{data?.user.name}</p>

						<p className='text-sm opacity-40'>{data?.user.email}</p>
					</div>

					<div className='flex size-10 items-center justify-center rounded-sm bg-white/20 text-2xl uppercase text-white'>
						{data?.user.name?.charAt(0) || 'A'}
					</div>
				</div>
			)}
		</div>
	)
}
