'use client'

import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Field,
	FieldError,
	FieldLabel,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@repo/ui/components'
import { useState } from 'react'
import { cn } from '@repo/ui/lib'
import { useFormContext } from 'react-hook-form'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { RequiredSymbol } from '@/components'

interface Item {
	value: string
	label: string
	color: string
}

interface Props {
	name: string
	label?: string
	placeholder: string
	required?: boolean
	noResultsText: string
	selectPlaceholder: string
	mapTable: Item[]
	popoverAlign?: 'start' | 'end'
	onSelect?: (item: Item) => void
	className?: string
}

export const FormCombobox = ({
	name,
	label,
	placeholder,
	required,
	noResultsText,
	selectPlaceholder,
	mapTable,
	popoverAlign,
	onSelect,
	className,
}: Props) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext()
	const [open, setOpen] = useState<boolean>(false)

	const value = watch(name)
	const errorText = errors[name]?.message as string

	const selectedItem = mapTable.find((item) => item.value === value)

	const handleSelect = (currentValue: string) => {
		const selectedItem = mapTable.find((item) => item.value === currentValue)

		if (selectedItem) {
			setValue(name, selectedItem.value, { shouldValidate: true })

			if (onSelect) {
				onSelect(selectedItem)
			}
		}

		setOpen(false)
	}

	const ColorSwatch = ({ color }: { color: string }) => (
		<div className='mr-2 size-4 rounded' style={{ backgroundColor: color }} />
	)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<Field>
				{label && (
					<FieldLabel htmlFor={name}>
						{label} {required && <RequiredSymbol />}
					</FieldLabel>
				)}

				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						onClick={() => setOpen(true)}
						className={cn('hover:bg-accent border-[#e5e7eb] text-[#78716c]', className)}
						{...register(name)}
					>
						{selectedItem ? (
							<div className='flex items-center'>
								<ColorSwatch color={selectedItem.color} />

								{selectedItem.label}
							</div>
						) : (
							placeholder
						)}

						<ChevronsUpDownIcon className='ml-2 size-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>

				{errorText && <FieldError>{errorText}</FieldError>}
			</Field>

			<PopoverContent align={popoverAlign} className='p-0'>
				<Command>
					<CommandInput placeholder={selectPlaceholder} name={name} />

					<CommandList>
						<CommandEmpty>{noResultsText}</CommandEmpty>

						<CommandGroup>
							{mapTable.map((item) => (
								<CommandItem key={item.value} value={item.label} onSelect={() => handleSelect(item.value)}>
									<CheckIcon
										className={cn('mr-2 size-4', value === item.label ? 'opacity-100' : 'opacity-0')}
									/>

									<ColorSwatch color={item.color} />

									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
