import { Separator } from '@repo/ui/components'

import { Profile } from '@/components'

interface IHeading {
	title: string
	hiddenProfile?: boolean
}

export function Heading({ title, hiddenProfile }: IHeading) {
	return (
		<div className='my-2 flex flex-col gap-2'>
			<div className='flex items-center justify-between'>
				<h1 className='mx-2 text-3xl font-medium'>{title}</h1>

				{!hiddenProfile && <Profile />}
			</div>

			<Separator />
		</div>
	)
}
