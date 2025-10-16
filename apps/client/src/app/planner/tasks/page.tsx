import type { Metadata } from 'next'

import { Heading } from '@/components/ui/heading'
import { TasksView } from './_components/tasks-view'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE,
}

const TasksPage = () => {
	return (
		<div>
			<Heading title='Tasks' />

			<TasksView />
		</div>
	)
}

export default TasksPage
