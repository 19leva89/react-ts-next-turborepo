import { cn } from '@repo/ui/lib'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { GripVertical, Loader, Trash } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { useDeleteTask } from '../../_hooks/useDeleteTask'
import { useTaskDebounce } from '../../_hooks/useTaskDebounce'
import { DatePicker } from '@/components/ui/task-edit/date-picker'
import { SingleSelect } from '@/components/ui/task-edit/single-select'
import { TransparentField } from '@/components/ui/field/TransparentField'
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
				'border-border animation-opacity relative grid grid-cols-[1.4fr_0.4fr_0.4fr_0.1fr] gap-2 rounded border-t py-2 font-normal transition-colors hover:bg-[#1c1f1f]',
				watch('isCompleted') &&
					'[&>div>span>input]:italic [&>div>span>input]:line-through [&>div>span>input]:opacity-50',
			)}
		>
			<div className='inline-flex w-full items-center justify-center gap-2.5'>
				<button
					aria-describedby='todo-item'
					className='cursor-pointer opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100'
				>
					<GripVertical />
				</button>

				<Controller
					control={control}
					name='isCompleted'
					render={({ field: { value, onChange } }) => <Checkbox onChange={onChange} checked={value} />}
				/>

				<TransparentField {...register('name')} />
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
				className='flex cursor-pointer items-center justify-center opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100'
			>
				{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
			</button>
		</div>
	)
}
