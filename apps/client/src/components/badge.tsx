import { tv } from 'tailwind-variants'
import type { CSSProperties, PropsWithChildren } from 'react'

interface IBadge {
	variant?: string
	style?: CSSProperties
	className?: string
}

const badge = tv({
	base: 'rounded-lg w-max py-1 px-2 text-xs font-semibold text-sm text-white transition',
	variants: {
		backgroundColor: {
			gray: 'bg-gray-500/20',
			high: 'bg-red-400/60',
			medium: 'bg-orange-400/70',
			low: 'bg-blue-400/70',
		},
	},
	defaultVariants: {
		backgroundColor: 'gray',
	},
})

export function Badge({ children, className, variant, style }: PropsWithChildren<IBadge>) {
	return (
		<span
			style={style}
			className={badge({
				backgroundColor: variant as 'low' | 'high' | 'medium',
				className,
			})}
		>
			{children}
		</span>
	)
}
