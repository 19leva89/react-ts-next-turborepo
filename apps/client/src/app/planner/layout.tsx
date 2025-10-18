import type { PropsWithChildren } from 'react'

import { Sidebar } from '@/components/sidebar'

const PlannerLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='grid min-h-screen grid-cols-[1.2fr_6fr] 2xl:grid-cols-[1.1fr_6fr]'>
			<Sidebar />

			<main className='my-2 max-h-screen overflow-x-hidden'>{children}</main>
		</div>
	)
}

export default PlannerLayout
