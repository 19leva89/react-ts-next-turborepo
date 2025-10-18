import { Button } from '@repo/ui/components'
import { useFormContext } from 'react-hook-form'
import { EditIcon, GripVerticalIcon, LoaderIcon, TrashIcon } from 'lucide-react'

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
					backgroundColor: item.color || 'lightSlateGray',
					height: `${item.duration}px`,
				}}
				className='relative mb-3 flex items-center justify-between rounded p-4 text-sm transition-opacity'
			>
				<div className='flex items-center'>
					<Button
						{...attributes}
						{...listeners}
						variant='ghost'
						size='icon-sm'
						aria-describedby='time-block'
						className='opacity-50 transition-opacity duration-300 ease-in-out hover:bg-transparent hover:opacity-100'
					>
						<GripVerticalIcon />
					</Button>

					<div>
						{item.name} <i className='text-xs opacity-50'>({item.duration} min.)</i>
					</div>
				</div>

				<div className='flex items-center gap-1'>
					<Button
						variant='ghost'
						size='icon-sm'
						onClick={() => {
							reset({
								id: item.id,
								color: item.color,
								duration: item.duration,
								name: item.name,
								order: item.order,
							})
						}}
						className='opacity-50 transition-opacity duration-300 ease-in-out hover:bg-transparent hover:opacity-100'
					>
						<EditIcon />
					</Button>

					<Button
						variant='ghost'
						size='icon-sm'
						onClick={() => deleteTimeBlock()}
						className='opacity-50 transition-opacity duration-300 ease-in-out hover:bg-transparent hover:opacity-100'
					>
						{isDeletePending ? <LoaderIcon /> : <TrashIcon />}
					</Button>
				</div>
			</div>
		</div>
	)
}
