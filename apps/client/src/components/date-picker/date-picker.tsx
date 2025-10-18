import dayjs from 'dayjs'
import { useState } from 'react'
import { cn } from '@repo/ui/lib'
import { XIcon } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

import 'react-day-picker/dist/style.css'

import { useOutside } from '@/hooks'
import { formatCaption } from '@/components/date-picker'

dayjs.extend(LocalizedFormat)

interface IDatePicker {
	onChange: (value: string) => void
	value: string
	position?: 'left' | 'right'
}

export function DatePicker({ onChange, value, position = 'right' }: IDatePicker) {
	const [selected, setSelected] = useState<Date>()
	const { isShow, setIsShow, ref } = useOutside(false)

	const handleDaySelect = (date: Date) => {
		setSelected(date)

		if (date) {
			onChange(date.toISOString())
			setIsShow(false)
		} else {
			onChange('')
		}
	}

	return (
		<div className='relative' ref={ref}>
			<button onClick={() => setIsShow(!isShow)}>
				{value ? dayjs(value).format('LL') : 'Click for select'}
			</button>

			{value && (
				<button
					onClick={() => onChange('')}
					className='absolute -right-4 -top-2 opacity-30 transition-opacity duration-300 ease-in-out hover:opacity-100'
				>
					<XIcon size={14} />
				</button>
			)}

			{isShow && (
				<div
					className={cn(
						'slide bg-sidebar absolute z-10 rounded-lg p-2.5 shadow-sm',
						position === 'left' ? '-left-4' : '-right-4',
					)}
					style={{
						top: 'calc(100% + .7rem)',
					}}
				>
					<DayPicker
						mode='single'
						defaultMonth={selected || new Date()}
						selected={selected}
						onSelect={handleDaySelect}
						weekStartsOn={1}
						formatters={{ formatCaption }}
						required={true}
					/>
				</div>
			)}
		</div>
	)
}
