'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import { COLUMNS } from '../columns.data'
import { useTasks } from '../../_hooks/useTasks'
import { ListRowParent } from './list-row-parent'
import { useTaskDnd } from '../../_hooks/useTaskDnd'

export const ListView = () => {
	const { items, setItems } = useTasks()
	const { onDragEnd } = useTaskDnd()

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="w-full">
				<div className="grid grid-cols-[1.4fr_0.4fr_0.4fr_0.1fr] rounded border-t border-border [&>div]:border-r [&>div]:border-border [&>div]:py-2 [&>div]:px-4 [&>div:last-child]:border-0">
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
					<div></div>
				</div>

				<div className="parents-wrapper">
					{COLUMNS.map((column) => (
						<ListRowParent
							items={items}
							label={column.label}
							value={column.value}
							setItems={setItems}
							key={column.value}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	)
}
