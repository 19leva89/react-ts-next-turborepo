'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import { COLUMNS } from '../columns.data'
import { KanbanColumn } from './kanban-column'
import { useTasks } from '../../_hooks/useTasks'
import { useTaskDnd } from '../../_hooks/useTaskDnd'

export const KanbanView = () => {
	const { items, setItems } = useTasks()
	const { onDragEnd } = useTaskDnd()

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='grid w-full grid-flow-col gap-8 overflow-x-auto'>
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
