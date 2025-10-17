import type { Metadata } from 'next'

import { Heading } from '@/components/heading'
import { Pomodoro } from './_components/pomodoro'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Pomodoro timer',
	...NO_INDEX_PAGE,
}

const PomodoroPage = () => {
	return (
		<div>
			<Heading title='Pomodoro timer' />

			<Pomodoro />
		</div>
	)
}

export default PomodoroPage
