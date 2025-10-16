'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import { COLUMNS } from '../columns.data'
import { useTasks } from '../../_hooks/useTasks'
import { KanbanColumn } from './kanban-column'
import { useTaskDnd } from '../../_hooks/useTaskDnd'

export const KanbanView = () => {
	const { items, setItems } = useTasks()
	const { onDragEnd } = useTaskDnd()

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="grid grid-flow-col gap-8 w-full overflow-x-auto">
				{COLUMNS.map((column) => (
					<KanbanColumn
						key={column.value}
						value={column.value}
						label={column.label}
						items={items}
						setItems={setItems}
					/>
				))}
			</div>
		</DragDropContext>
	)
}
