'use client'

import { Spinner } from '@repo/ui/components'

import { useProfile } from '@/hooks/use-profile'

export const Statistics = () => {
	const { data, isLoading } = useProfile()

	if (isLoading) {
		return (
			<div className='m-6 flex w-full items-center justify-center'>
				<Spinner className='size-5' />
			</div>
		)
	}

	return (
		<div className='mt-7 grid grid-cols-4 gap-12'>
			{data?.statistics.length ? (
				data.statistics.map((statistic) => (
					<div
						key={statistic.label}
						className='bg-border/5 rounded-sm text-center transition-transform duration-500 hover:-translate-y-3'
					>
						<div className='text-xl'>{statistic.label}</div>

						<div className='text-3xl font-semibold'>{statistic.value}</div>
					</div>
				))
			) : (
				<div>Statistics not loaded!</div>
			)}
		</div>
	)
}
