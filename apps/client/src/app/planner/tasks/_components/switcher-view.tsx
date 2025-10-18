'use client'

import { cn } from '@repo/ui/lib'
import { Button } from '@repo/ui/components'
import { KanbanIcon, ListTodoIcon } from 'lucide-react'

import type { TypeView } from './tasks-view'

interface ISwitcherView {
	type: TypeView
	setType: (value: TypeView) => void
}

export const SwitcherView = ({ setType, type }: ISwitcherView) => {
	return (
		<div className='mb-5 flex items-center gap-1'>
			<Button
				variant='ghost'
				size='lg'
				onClick={() => setType('list')}
				className={cn(
					'transition-all duration-300 ease-in-out',
					type === 'kanban' && 'opacity-40 hover:opacity-100',
				)}
			>
				<ListTodoIcon className='size-5' />
				List
			</Button>

			<Button
				variant='ghost'
				size='lg'
				onClick={() => setType('kanban')}
				className={cn(
					'transition-all duration-300 ease-in-out',
					type === 'list' && 'opacity-40 hover:opacity-100',
				)}
			>
				<KanbanIcon className='size-5' />
				Board
			</Button>
		</div>
	)
}
