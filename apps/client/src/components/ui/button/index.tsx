import { cn } from '@repo/ui/lib'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, className, ...rest }: PropsWithChildren<TypeButton>) {
	return (
		<button
			className={cn(
				'linear border-primary hover:bg-primary active:bg-brand-700 cursor-pointer rounded-lg border bg-transparent px-7 py-2 text-base font-medium text-white transition-colors duration-300 ease-in-out',
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
