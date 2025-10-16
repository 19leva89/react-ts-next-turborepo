'use client'

import { cn } from '@repo/ui/lib'
import { Kanban, ListTodo } from 'lucide-react'

import type { TypeView } from './tasks-view'

interface ISwitcherView {
	type: TypeView
	setType: (value: TypeView) => void
}

export const SwitcherView = ({ setType, type }: ISwitcherView) => {
	return (
		<div className='mb-5 flex items-center gap-4'>
			<button
				className={cn('flex cursor-pointer items-center gap-1 transition-opacity duration-300 ease-in-out', {
					'opacity-40 hover:opacity-100': type === 'kanban',
				})}
				onClick={() => setType('list')}
			>
				<ListTodo />
				List
			</button>

			<button
				className={cn('flex cursor-pointer items-center gap-1 transition-opacity duration-300 ease-in-out', {
					'opacity-40 hover:opacity-100': type === 'list',
				})}
				onClick={() => setType('kanban')}
			>
				<Kanban />
				Board
			</button>
		</div>
	)
}
