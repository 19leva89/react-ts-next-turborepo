import type { Dispatch, SetStateAction } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'

import { FILTERS } from '../columns.data'
import { KanbanCard } from './kanban-card'
import { filterTasks } from '../filter-tasks'
import type { ITaskResponse } from '@/types/task.types'
import { KanbanAddCardInput } from './kanban-add-card-input'

interface IKanbanColumn {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const KanbanColumn = ({ value, items, label, setItems }: IKanbanColumn) => {
	return (
		<Droppable droppableId={value}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					className="w-[17rem] min-h-[79vh] whitespace-nowrap"
				>
					<div className="text-lg font-semibold mb-4">{label}</div>

					{filterTasks(items, value)?.map((item, index) => (
						<Draggable key={item.id} draggableId={String(item.id) || String('temp-task-id')} index={index}>
							{(provided) => (
								<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
									<KanbanCard key={item.id} item={item} setItems={setItems} />
								</div>
							)}
						</Draggable>
					))}

					{provided.placeholder}

					{value !== 'completed' && !items?.some((item) => !item.id) && (
						<KanbanAddCardInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
				</div>
			)}
		</Droppable>
	)
}
