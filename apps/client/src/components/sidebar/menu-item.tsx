import Link from 'next/link'

import { IMenuItem } from '@/components/sidebar'

export const MenuItem = ({ item }: { item: IMenuItem }) => {
	return (
		<Link
			href={item.link}
			className='hover:bg-border my-1 flex items-center gap-2 rounded-lg p-2 transition-colors duration-300 ease-in-out'
		>
			<item.icon />

			<span>{item.name}</span>
		</Link>
	)
}
