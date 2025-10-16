import { useFormContext } from 'react-hook-form'
import { Edit, GripVertical, Loader, Trash } from 'lucide-react'

import { useDeleteTimeBlock } from '../_hooks/use-delete-time-block'
import { useTimeBlockSortable } from '../_hooks/use-time-block-sortable'
import type { ITimeBlockResponse, TypeTimeBlockFormState } from '@/types/time-block.types'

export const TimeBlock = ({ item }: { item: ITimeBlockResponse }) => {
	const { reset } = useFormContext<TypeTimeBlockFormState>()
	const { deleteTimeBlock, isDeletePending } = useDeleteTimeBlock(item.id)
	const { attributes, listeners, setNodeRef, style } = useTimeBlockSortable(item.id)

	return (
		<div ref={setNodeRef} style={style}>
			<div
				style={{
					backgroundColor: item.color || 'lightslategray',
					height: `${item.duration}px`,
				}}
				className='relative mb-3 flex items-center justify-between rounded p-4 text-sm transition-opacity'
			>
				<div className='flex items-center'>
					<button
						{...attributes}
						{...listeners}
						aria-describedby='time-block'
						className='cursor-pointer opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-50'
					>
						<GripVertical className='size-4' />
					</button>

					<div>
						{item.name} <i className='text-xs opacity-50'>({item.duration} min.)</i>
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<button
						onClick={() => {
							reset({
								id: item.id,
								color: item.color,
								duration: item.duration,
								name: item.name,
								order: item.order,
							})
						}}
						className='mr-2 cursor-pointer opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100'
					>
						<Edit size={16} />
					</button>

					<button
						onClick={() => deleteTimeBlock()}
						className='cursor-pointer opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100'
					>
						{isDeletePending ? <Loader size={16} /> : <Trash size={16} />}
					</button>
				</div>
			</div>
		</div>
	)
}
