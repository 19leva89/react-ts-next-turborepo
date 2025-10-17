import { useEffect } from 'react'
import { Button } from '@repo/ui/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, Resolver, SubmitHandler, useForm, useFormContext } from 'react-hook-form'

import { COLORS } from '../_constants/colors.data'
import { FormCombobox, FormInput } from '@/components/forms'
import { useUpdateTimeBlock } from '../_hooks/use-update-time-block'
import { useCreateTimeBlock } from '../_hooks/use-create-time-block'
import type { TypeTimeBlockFormState } from '@/types/time-block.types'
import { TimeBlockSchema, TTimeBlockValues } from '@/components/forms/schemas'

export const TimeBlockingForm = () => {
	const { watch, reset } = useFormContext<TypeTimeBlockFormState>()

	const existsId = watch('id')

	const { createTimeBlock, isPending: isCreating } = useCreateTimeBlock()
	const { updateTimeBlock, isPending: isUpdating } = useUpdateTimeBlock(existsId)

	const form = useForm({
		resolver: zodResolver(TimeBlockSchema) as Resolver<TTimeBlockValues>,
		defaultValues: {
			id: undefined,
			name: '',
			duration: 5,
			color: COLORS[COLORS.length - 1]?.value,
			order: 1,
		},
	})

	const onSubmit: SubmitHandler<TypeTimeBlockFormState> = (data) => {
		const { color, id, ...rest } = data
		const dto = { ...rest, color: color || undefined }

		if (id) {
			updateTimeBlock({
				id,
				data: dto,
			})
		} else {
			createTimeBlock(dto)
		}

		reset({
			id: undefined,
			name: '',
			duration: 0,
			color: COLORS[COLORS.length - 1]?.value,
			order: 1,
		})
	}

	useEffect(() => {
		if (existsId) {
			const currentData = watch()
			form.reset(currentData)
		}
	}, [existsId, watch, form])

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='m-6 flex w-3/5 flex-col gap-4'>
				<FormInput name='duration' type='number' label='Enter duration (min.)' placeholder='30' required />

				<FormInput name='name' type='text' label='Enter name' placeholder='Time block name' />

				<FormCombobox
					name='color'
					label='Select color'
					placeholder='Select color'
					noResultsText='No results'
					selectPlaceholder='Type color'
					mapTable={COLORS.map((item) => ({
						value: item.value,
						label: item.label,
						color: item.value,
					}))}
					popoverAlign='end'
					className='flex h-11 items-center justify-between rounded-xl'
				/>

				<Button type='submit' disabled={isCreating || isUpdating} className='mt-6'>
					{existsId ? 'Update' : 'Create'}
				</Button>
			</form>
		</FormProvider>
	)
}
