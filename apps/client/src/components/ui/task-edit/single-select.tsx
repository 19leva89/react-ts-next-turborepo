import { cn } from '@repo/ui/lib'
import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { useOutside } from '@/hooks/use-outside'

export interface IOption {
	label: string
	value: string
}

interface ISingleSelect {
	data: IOption[]
	onChange: (value: string) => void
	value: string
	isColorSelect?: boolean
}

export function SingleSelect({ data, onChange, value, isColorSelect }: ISingleSelect) {
	const { isShow, setIsShow, ref } = useOutside(false)
	const getValue = () => data.find((item) => item.value === value)?.value

	return (
		<div
			className={cn('relative min-w-36', {
				'w-max': isColorSelect,
			})}
			ref={ref}
		>
			<button
				onClick={(e) => {
					e.preventDefault()
					setIsShow(!isShow)
				}}
				className='cursor-pointer'
			>
				{getValue() ? (
					<Badge
						variant={value}
						className='capitalize'
						style={isColorSelect ? { backgroundColor: value } : {}}
					>
						{getValue()}
					</Badge>
				) : (
					<Badge>Click for select</Badge>
				)}
			</button>

			{value && (
				<button
					onClick={(e) => {
						e.preventDefault()
						onChange('')
					}}
					className='absolute -right-4 -top-2 cursor-pointer opacity-30 transition-opacity duration-300 ease-in-out hover:opacity-100'
				>
					<X size={14} />
				</button>
			)}
			{isShow && (
				<div
					className={cn('slide bg-sidebar absolute left-0 z-10 w-full rounded-lg p-2.5 shadow-sm')}
					style={{
						top: 'calc(100% + .5rem)',
					}}
				>
					{data.map((item) => (
						<button
							key={item.value}
							onClick={(e) => {
								e.preventDefault()
								onChange(item.value)
								setIsShow(false)
							}}
							className='mb-4 block cursor-pointer rounded-lg capitalize last:mb-0'
							style={
								isColorSelect
									? {
											backgroundColor: item.value,
										}
									: {}
							}
						>
							<Badge variant={item.value}>{item.label}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
