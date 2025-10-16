import { Loader as LoaderIcon } from 'lucide-react'

export function Loader() {
	return (
		<div className='flex items-center justify-center'>
			<LoaderIcon className='size-5 animate-spin text-white' />
		</div>
	)
}
