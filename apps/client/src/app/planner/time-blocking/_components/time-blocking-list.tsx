import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { TimeBlock } from './time-block'
import { Loader } from '@/components/ui/loader'
import { calcHoursLeft } from './calc-hours-left'
import { useTimeBlocks } from '../_hooks/use-time-blocks'
import { useTimeBlockDnd } from '../_hooks/use-time-block-dnd'

export const TimeBlockingList = () => {
	const { items, setItems, isLoading } = useTimeBlocks()
	const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems)

	if (isLoading) return <Loader />

	const { hoursLeft } = calcHoursLeft(items)

	return (
		<div>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<div className="space-y-3">
					<SortableContext items={items || []} strategy={verticalListSortingStrategy}>
						{items?.length ? (
							items?.map((item) => <TimeBlock key={item.id} item={item} />)
						) : (
							<div className="text-muted-foreground">Add the first time-block on the right form</div>
						)}
					</SortableContext>
				</div>
			</DndContext>

			<div className="mt-4 text-sm text-muted-foreground">
				{hoursLeft > 0 ? `${hoursLeft} hours out of 24 left for sleep` : 'No hours left for sleep'}
			</div>
		</div>
	)
}
