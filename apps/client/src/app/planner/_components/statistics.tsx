'use client'

import { Loader } from '@/components/ui/loader'
import { useProfile } from '@/hooks/use-profile'

export const Statistics = () => {
	const { data, isLoading } = useProfile()

	return isLoading ? (
		<Loader />
	) : (
		<div className='mt-7 grid grid-cols-4 gap-12'>
			{data?.statistics.length ? (
				data.statistics.map((statistic) => (
					<div
						className='bg-border/5 rounded-sm text-center transition-transform duration-500 hover:-translate-y-3'
						key={statistic.label}
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
