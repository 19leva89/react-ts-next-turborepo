import type { Metadata } from 'next'

import { Settings } from './_components/settings'
import { Heading } from '@/components/heading'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE,
}

const SettingsPage = () => {
	return (
		<div>
			<Heading title='Settings' />

			<Settings />
		</div>
	)
}

export default SettingsPage
