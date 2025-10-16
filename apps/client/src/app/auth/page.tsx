import type { Metadata } from 'next'

import { Auth } from './_components/auth'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE,
}

const AuthPage = () => {
	return <Auth />
}

export default AuthPage
