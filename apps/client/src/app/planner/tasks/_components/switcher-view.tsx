'use client'

import { cn } from '@repo/ui/lib'
import { KanbanIcon, ListTodoIcon } from 'lucide-react'

import type { TypeView } from './tasks-view'

interface ISwitcherView {
	type: TypeView
	setType: (value: TypeView) => void
}

export const SwitcherView = ({ setType, type }: ISwitcherView) => {
	return (
		<div className='mb-5 flex items-center gap-4'>
			<button
				onClick={() => setType('list')}
				className={cn(
					'flex cursor-pointer items-center gap-1 transition-opacity duration-300 ease-in-out',
					type === 'kanban' && 'opacity-40 hover:opacity-100',
				)}
			>
				<ListTodoIcon />
				List
			</button>

			<button
				onClick={() => setType('kanban')}
				className={cn(
					'flex cursor-pointer items-center gap-1 transition-opacity duration-300 ease-in-out',
					type === 'list' && 'opacity-40 hover:opacity-100',
				)}
			>
				<KanbanIcon />
				Board
			</button>
		</div>
	)
}
