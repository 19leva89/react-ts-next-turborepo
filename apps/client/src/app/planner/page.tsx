import type { Metadata } from 'next'

import { Heading } from '@/components/heading'
import { Statistics } from './_components/statistics'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE,
}

const DashboardPage = () => {
	return (
		<div>
			<Heading title='Statistics' />

			<Statistics />
		</div>
	)
}

export default DashboardPage
