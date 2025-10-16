'use client'

import {
	Button,
	Calendar,
	Field,
	FieldContent,
	FieldError,
	FieldLabel,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@repo/ui/components'
import { useState } from 'react'
import { cn } from '@repo/ui/lib'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { ClearButton, RequiredSymbol } from '@/components'

interface Props {
	name: string
	label?: string
	required?: boolean
	placeholder?: string
	dateFormat?: string
	disabled?: boolean
	className?: string
}

export const FormCalendar = ({
	className,
	name,
	label,
	required,
	placeholder,
	disabled = false,
	dateFormat = 'PPP',
}: Props) => {
	const {
		formState: { errors },
		watch,
		setValue,
		trigger,
	} = useFormContext()

	const [open, setOpen] = useState<boolean>(false)

	const value = watch(name) as Date | undefined
	const errorText = errors[name]?.message as string

	const onClickClear = async () => {
		setValue(name, undefined)
		await trigger(name)
	}

	const handleSelect = async (date: Date | undefined) => {
		setValue(name, date, { shouldValidate: true })
		await trigger(name)
		setOpen(false)
	}

	return (
		<Field className={className}>
			{label && (
				<FieldLabel htmlFor={name}>
					{label} {required && <RequiredSymbol />}
				</FieldLabel>
			)}

			<FieldContent>
				<div className='relative'>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger id={name} asChild>
							<Button
								type='button'
								variant='outline'
								disabled={disabled}
								className={cn(
									'h-11 w-full justify-start border-[#e5e7eb] text-left font-normal hover:bg-transparent',
									!value && 'text-muted-foreground',
									errorText && 'border-red-500',
								)}
							>
								<CalendarIcon className='mr-2 size-4' />
								{value ? format(value, dateFormat) : placeholder}
							</Button>
						</PopoverTrigger>

						<PopoverContent className='w-auto p-0' align='start'>
							<Calendar mode='single' selected={value} onSelect={handleSelect} autoFocus />
						</PopoverContent>
					</Popover>

					{value && <ClearButton onClick={onClickClear} />}
				</div>
			</FieldContent>

			{errorText && <FieldError>{errorText}</FieldError>}
		</Field>
	)
}
