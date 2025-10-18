import { cn } from '@repo/ui/lib'
import { DeleteIcon } from 'lucide-react'

interface Props {
	onClick?: VoidFunction
	className?: string
}

export const ClearButton = ({ onClick, className }: Props) => {
	return (
		<button
			onClick={onClick}
			type='button'
			className={cn(
				'absolute right-4 top-1/2 -translate-y-1/2 opacity-30 transition-opacity duration-300 ease-in-out hover:opacity-100',
				className,
			)}
		>
			<DeleteIcon size={20} />
		</button>
	)
}
