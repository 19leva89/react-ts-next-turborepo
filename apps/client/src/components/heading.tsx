import { Separator } from '@repo/ui/components'

interface IHeading {
	title: string
}

export function Heading({ title }: IHeading) {
	return (
		<div className='my-2 flex flex-col items-start gap-2'>
			<h1 className='text-3xl font-medium'>{title}</h1>

			<Separator />
		</div>
	)
}
