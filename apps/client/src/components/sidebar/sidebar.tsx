'use client'

import Link from 'next/link'
import { SquareChartGanttIcon } from 'lucide-react'

import { COLORS } from '@/constants/color.constants'
import { MENU, MenuItem } from '@/components/sidebar'

export const Sidebar = () => {
	return (
		<aside className='border-r-border bg-sidebar flex h-full flex-col justify-between border-r py-2'>
			<div className='flex flex-col gap-2'>
				<Link href='/' className='mx-2 flex items-center gap-2.5'>
					<SquareChartGanttIcon color={COLORS.primary} size={38} />

					<span className='relative text-2xl font-bold'>
						Planner
						<span className='absolute -right-4 -top-0 text-xs font-normal opacity-40'>®</span>
					</span>
				</Link>

				<div className='px-1.5 py-3'>
					{MENU.map((item) => (
						<MenuItem item={item} key={item.link} />
					))}
				</div>
			</div>

			<footer className='text-center text-xs font-normal opacity-40'>
				2025 &copy; With love from{' '}
				<a
					href='https://www.linkedin.com/in/lev-dmitry'
					target='_blank'
					rel='noreferrer noopener'
					className='hover:text-primary text-brand-300 transition-colors'
				>
					SobolevDev
				</a>
				<br /> All rights reserved
			</footer>
		</aside>
	)
}
