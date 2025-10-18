import { cn } from '@repo/ui/lib'
import { Input } from '@repo/ui/components'
import { Controller, useForm } from 'react-hook-form'
import type { Dispatch, SetStateAction } from 'react'
import { GripVerticalIcon, LoaderIcon, TrashIcon } from 'lucide-react'

import { DatePicker } from '@/components/date-picker'
import { Checkbox, SingleSelect } from '@/components'
import { useDeleteTask } from '../../_hooks/useDeleteTask'
import { useTaskDebounce } from '../../_hooks/useTaskDebounce'
import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

interface IListRow {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const ListRow = ({ item, setItems }: IListRow) => {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority,
		},
	})

	useTaskDebounce({ watch, itemId: item.id })

	const { deleteTask, isDeletePending } = useDeleteTask()

	return (
		<div
			className={cn(
				'border-border animation-opacity hover:bg-primary/20 relative grid grid-cols-[1.4fr_0.4fr_0.4fr_0.1fr] gap-2 rounded border-t py-2 font-normal transition-colors',
				watch('isCompleted') &&
					'[&>div>span>input]:italic [&>div>span>input]:line-through [&>div>span>input]:opacity-50',
			)}
		>
			<div className='inline-flex w-full items-center justify-center gap-2.5'>
				<button
					aria-describedby='todo-item'
					className='opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100'
				>
					<GripVerticalIcon />
				</button>

				<Controller
					control={control}
					name='isCompleted'
					render={({ field: { value, onChange } }) => <Checkbox onChange={onChange} checked={value} />}
				/>

				<Input
					type='text'
					placeholder='Input task name'
					className='w-3/4 border-none bg-transparent shadow-none'
					{...register('name')}
				/>
			</div>

			<div className='inline-flex items-center justify-center'>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => <DatePicker onChange={onChange} value={value || ''} />}
				/>
			</div>

			<div className='flex items-center justify-center'>
				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={['high', 'medium', 'low'].map((item) => ({
								value: item,
								label: item,
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>

			<button
				onClick={() => (item.id ? deleteTask(item.id) : setItems((prev) => prev?.slice(0, -1)))}
				className='flex items-center justify-center opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100'
			>
				{isDeletePending ? <LoaderIcon size={15} /> : <TrashIcon size={15} />}
			</button>
		</div>
	)
}
