'use client'

import { useIsFetching, useIsMutating } from '@tanstack/react-query'

import { Loader } from '@/components/ui/loader'

export const GlobalLoader = () => {
	const isMutating = useIsMutating()
	const isFetching = useIsFetching()

	return isFetching || isMutating ? (
		<div className='fixed z-50'>
			<Loader />
		</div>
	) : null
}
