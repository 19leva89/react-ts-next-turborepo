import { cn } from '@repo/ui/lib'
import { XIcon } from 'lucide-react'

import { Badge } from '@/components/badge'
import { useOutside } from '@/hooks/use-outside'

export interface IOption {
	label: string
	value: string
}

interface ISingleSelect {
	data: IOption[]
	value: string
	onChange: (value: string) => void
	isColorSelect?: boolean
}

export function SingleSelect({ data, onChange, value, isColorSelect }: ISingleSelect) {
	const { isShow, setIsShow, ref } = useOutside(false)

	const getValue = () => data.find((item) => item.value === value)?.value

	return (
		<div ref={ref} className={cn('relative min-w-36', isColorSelect && 'w-max')}>
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
						style={isColorSelect ? { backgroundColor: value } : {}}
						className='capitalize'
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
					<XIcon size={14} />
				</button>
			)}

			{isShow && (
				<div
					style={{
						top: 'calc(100% + .5rem)',
					}}
					className='slide bg-sidebar absolute left-0 z-10 w-full rounded-lg p-2.5 shadow-sm'
				>
					{data.map((item) => (
						<button
							key={item.value}
							onClick={(e) => {
								e.preventDefault()
								onChange(item.value)
								setIsShow(false)
							}}
							style={
								isColorSelect
									? {
											backgroundColor: item.value,
										}
									: {}
							}
							className='mb-4 block cursor-pointer rounded-lg capitalize last:mb-0'
						>
							<Badge variant={item.value}>{item.label}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
