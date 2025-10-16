import type { Dispatch, SetStateAction } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'

import { ListRow } from './list-row'
import { FILTERS } from '../columns.data'
import { filterTasks } from '../filter-tasks'
import { ListAddRowInput } from './list-add-row-input'
import type { ITaskResponse } from '@/types/task.types'

interface IListRowParent {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const ListRowParent = ({ value, items, label, setItems }: IListRowParent) => {
	return (
		<Droppable droppableId={value}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					<div className="rounded border-t border-border bg-[#0e0f0f] [&>div]:py-3">
						<div className="font-semibold text-xl px-4">{label}</div>
					</div>

					{filterTasks(items, value)?.map((item, index) => (
						<Draggable key={item.id} draggableId={String(item.id) || String('temp-task-id')} index={index}>
							{(provided) => (
								<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
									<ListRow item={item} setItems={setItems} />
								</div>
							)}
						</Draggable>
					))}

					{provided.placeholder}

					{value !== 'completed' && !items?.some((item) => !item.id) && (
						<ListAddRowInput setItems={setItems} filterDate={FILTERS[value]?.format()} />
					)}
				</div>
			)}
		</Droppable>
	)
}
