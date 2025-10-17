'use client'

import { Spinner } from '@repo/ui/components'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'

export const GlobalLoader = () => {
	const isMutating = useIsMutating()
	const isFetching = useIsFetching()

	if (isFetching || isMutating) {
		return (
			<div className='fixed z-50 m-6 flex w-full items-center justify-center'>
				<Spinner className='size-5' />
			</div>
		)
	}
}
