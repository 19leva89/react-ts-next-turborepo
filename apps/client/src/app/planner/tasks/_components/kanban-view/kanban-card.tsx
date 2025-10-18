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

interface IKanbanCard {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const KanbanCard = ({ item, setItems }: IKanbanCard) => {
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
				'border-border animation-opacity bg-accent group relative mt-5 rounded border p-4 transition-all',
				watch('isCompleted') && 'italic line-through opacity-50',
			)}
		>
			<div className='mb-2 flex items-center text-[93%] [&>input:last-child]:ml-2'>
				<button
					aria-describedby='todo-item'
					className='-ml-1 -mr-0.5 opacity-20 transition-opacity duration-300 ease-in-out hover:opacity-100'
				>
					<GripVerticalIcon className='absolute right-1.5 top-2 size-4' />
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

			<div className='text-[83%] [&>div]:mb-2.5 [&>div]:w-max [&>div]:min-w-[6rem]'>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker onChange={onChange} value={value || ''} position='left' />
					)}
				/>

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

			<div className='absolute bottom-1 right-1.5 opacity-40 transition-opacity hover:opacity-100'>
				<button
					onClick={() => (item.id ? deleteTask(item.id) : setItems((prev) => prev?.slice(0, -1)))}
					className='opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100'
				>
					{isDeletePending ? <LoaderIcon size={15} /> : <TrashIcon size={15} />}
				</button>
			</div>
		</div>
	)
}
