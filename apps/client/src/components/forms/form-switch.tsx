'use client'

import { cn } from '@repo/ui/lib'
import { useFormContext } from 'react-hook-form'
import { Field, FieldContent, FieldError, Switch } from '@repo/ui/components'

import { RequiredSymbol } from '@/components'

interface Props {
	name: string
	label?: string
	description?: string
	required?: boolean
	className?: string
	disabled?: boolean
}

export const FormSwitch = ({
	className,
	name,
	label,
	description,
	required,
	disabled = false,
	...props
}: Props) => {
	const {
		formState: { errors },
		watch,
		setValue,
		trigger,
	} = useFormContext()

	const value = watch(name) as boolean
	const errorText = errors[name]?.message as string

	const handleChange = async (checked: boolean) => {
		setValue(name, checked, { shouldValidate: true })
		await trigger(name)
	}

	return (
		<Field className={cn('space-y-2', className)}>
			<FieldContent>
				<div className='border-input shadow-xs flex items-center gap-5 rounded-md border p-3'>
					<Switch
						id={name}
						checked={value || false}
						onCheckedChange={handleChange}
						disabled={disabled}
						className={cn(errorText && 'border-red-500')}
						{...props}
					/>

					<div className='flex flex-col gap-1'>
						{label && (
							<label
								htmlFor={name}
								className={cn(
									'cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
									disabled && 'cursor-not-allowed opacity-70',
								)}
							>
								{label} {required && <RequiredSymbol />}
							</label>
						)}

						{description && <p className='text-muted-foreground text-sm'>{description}</p>}
					</div>
				</div>
			</FieldContent>

			{errorText && <FieldError>{errorText}</FieldError>}
		</Field>
	)
}
