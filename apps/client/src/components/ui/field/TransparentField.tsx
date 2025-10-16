import { cn } from '@repo/ui/lib'
import { type InputHTMLAttributes, forwardRef } from 'react'

type TypeTransparentField = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<HTMLInputElement, TypeTransparentField>(
	({ className, ...rest }, ref) => {
		return (
			<input
				ref={ref}
				placeholder='Input task name'
				className={cn(
					'w-full border-none bg-transparent focus:shadow-transparent focus:outline-0',
					className,
				)}
				{...rest}
			/>
		)
	},
)

TransparentField.displayName = 'TransparentField'
