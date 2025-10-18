'use client'

import { Spinner } from '@repo/ui/components'

import { useLocalStorage } from '@/hooks'
import { SwitcherView } from './switcher-view'
import { ListView } from './list-view/list-view'
import { KanbanView } from './kanban-view/kanban-view'

export type TypeView = 'list' | 'kanban'

export const TasksView = () => {
	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'view-type',
		defaultValue: 'list',
	})

	if (isLoading) {
		return (
			<div className='m-6 flex w-full items-center justify-center'>
				<Spinner className='size-5' />
			</div>
		)
	}

	return (
		<div className='mx-2'>
			<SwitcherView setType={setType} type={type} />

			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	)
}
