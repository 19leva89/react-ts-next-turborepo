import Link from 'next/link'

import { Button, Separator } from '@repo/ui/components'

const HomePage = () => {
	return (
		<div className='mx-auto my-2 flex flex-col items-start gap-2'>
			<Button variant='default' className='mx-2'>
				<Link href='/planner'>Planner</Link>
			</Button>

			<Separator />
		</div>
	)
}

export default HomePage
