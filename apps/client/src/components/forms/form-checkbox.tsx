'use client'

import { cn } from '@repo/ui/lib'
import { useFormContext, Controller } from 'react-hook-form'
import { Checkbox, Field, FieldError, Label } from '@repo/ui/components'

import { RequiredSymbol } from '@/components'

interface Props {
	name: string
	label?: string
	required?: boolean
	disabled?: boolean
	className?: string
}

export const FormCheckbox = ({ name, label, required = false, disabled = false, className }: Props) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	const errorText = errors[name]?.message as string

	return (
		<Field className={cn('space-y-2', className)}>
			<Controller
				name={name}
				control={control}
				rules={{ required }}
				render={({ field }) => (
					<div className='flex items-center gap-2'>
						<Checkbox
							id={name}
							disabled={disabled}
							checked={!!field.value}
							onCheckedChange={(val) => field.onChange(val === true)}
							className={cn(
								'text-primary focus:ring-primary size-4 cursor-pointer rounded border-gray-300',
								errorText && 'border-red-500 text-red-600 focus:ring-red-500',
							)}
						/>

						{label && (
							<Label htmlFor={name}>
								{label} {required && <RequiredSymbol />}
							</Label>
						)}
					</div>
				)}
			/>

			{errorText && <FieldError>{errorText}</FieldError>}
		</Field>
	)
}
