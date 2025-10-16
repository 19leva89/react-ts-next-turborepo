'use client'

import { Loader } from '@/components/ui/loader'
import { useLocalStorage } from '@/hooks/use-local-storage'

import { ListView } from './list-view/list-view'
import { KanbanView } from './kanban-view/kanban-view'
import { SwitcherView } from './switcher-view'

export type TypeView = 'list' | 'kanban'

export const TasksView = () => {
	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'view-type',
		defaultValue: 'list',
	})

	if (isLoading) return <Loader />

	return (
		<div>
			<SwitcherView setType={setType} type={type} />

			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	)
}
