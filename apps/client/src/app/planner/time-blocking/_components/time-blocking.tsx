'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { TimeBlockingList } from './time-blocking-list'
import { TimeBlockingForm } from './time-blocking-form'
import type { TypeTimeBlockFormState } from '@/types/time-block.types'

export const TimeBlocking = () => {
	const methods = useForm<TypeTimeBlockFormState>()

	return (
		<FormProvider {...methods}>
			<div className='mx-2 grid grid-cols-2 gap-12'>
				<TimeBlockingList />

				<TimeBlockingForm />
			</div>
		</FormProvider>
	)
}
