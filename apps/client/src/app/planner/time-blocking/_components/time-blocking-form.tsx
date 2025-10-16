import { Button } from '@repo/ui/components'
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'

import { COLORS } from '../_constants/colors.data'
import { Field } from '@/components/ui/field/Field'
import { useUpdateTimeBlock } from '../_hooks/use-update-time-block'
import { useCreateTimeBlock } from '../_hooks/use-create-time-block'
import { SingleSelect } from '@/components/ui/task-edit/single-select'
import type { TypeTimeBlockFormState } from '@/types/time-block.types'

export const TimeBlockingForm = () => {
	const { register, control, watch, reset, handleSubmit } = useFormContext<TypeTimeBlockFormState>()

	const existsId = watch('id')

	const { updateTimeBlock } = useUpdateTimeBlock(existsId)
	const { createTimeBlock, isPending } = useCreateTimeBlock()

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
			color: COLORS[COLORS.length - 1],
			duration: 0,
			name: '',
			id: undefined,
			order: 1,
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='w-3/5'>
			<Field
				{...register('name', {
					required: true,
				})}
				id='name'
				label='Enter name:'
				placeholder='Enter name:'
				extra='mb-4'
			/>

			<Field
				{...register('duration', {
					required: true,
					valueAsNumber: true,
				})}
				id='duration'
				label='Enter duration (min.):'
				placeholder='Enter duration (min.):'
				isNumber
				extra='mb-4'
			/>

			<div>
				<span className='mb-1.5 inline-block'>Color:</span>

				<Controller
					control={control}
					name='color'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={COLORS.map((item) => ({
								value: item,
								label: item,
							}))}
							onChange={onChange}
							value={value ?? COLORS[COLORS.length - 1]!}
							isColorSelect
						/>
					)}
				/>
			</div>

			<Button type='submit' disabled={isPending} className='mt-6'>
				{existsId ? 'Update' : 'Create'}
			</Button>
		</form>
	)
}
