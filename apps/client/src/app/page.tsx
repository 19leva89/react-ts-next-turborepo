import Link from 'next/link'

import { Button } from '@/components/ui/button'

const HomePage = () => {
	return (
		<div className='p-layout border-b-border flex items-center gap-2.5 border-b'>
			<Button>
				<Link href='/planner'>Planner</Link>
			</Button>
		</div>
	)
}

export default HomePage
