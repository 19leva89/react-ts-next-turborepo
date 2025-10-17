import { Spinner } from '@repo/ui/components'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { TimeBlock } from './time-block'
import { calcHoursLeft } from './calc-hours-left'
import { useTimeBlocks } from '../_hooks/use-time-blocks'
import { useTimeBlockDnd } from '../_hooks/use-time-block-dnd'

export const TimeBlockingList = () => {
	const { items, setItems, isLoading } = useTimeBlocks()
	const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems)

	const { hoursLeft } = calcHoursLeft(items)

	if (isLoading) {
		return (
			<div className='m-6 flex w-full items-center justify-center'>
				<Spinner className='size-5' />
			</div>
		)
	}

	return (
		<div>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<div className='space-y-3'>
					<SortableContext items={items || []} strategy={verticalListSortingStrategy}>
						{items?.length ? (
							items?.map((item) => <TimeBlock key={item.id} item={item} />)
						) : (
							<div className='text-muted-foreground'>Add the first time-block on the right form</div>
						)}
					</SortableContext>
				</div>
			</DndContext>

			<div className='text-muted-foreground mt-4 text-sm'>
				{hoursLeft > 0 ? `${hoursLeft} hours out of 24 left for sleep` : 'No hours left for sleep'}
			</div>
		</div>
	)
}
