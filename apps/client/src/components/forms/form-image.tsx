'use client'

import Image from 'next/image'
import { cn } from '@repo/ui/lib'
import { useFormContext } from 'react-hook-form'
import { XIcon, ImageIcon, UploadIcon } from 'lucide-react'
import { Field, FieldContent, FieldError, FieldLabel, Input } from '@repo/ui/components'
import { DragEvent, InputHTMLAttributes, useState, useCallback, ChangeEvent } from 'react'

import { RequiredSymbol } from '@/components'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
	name: string
	label?: string
	placeholder?: string
	required?: boolean
	className?: string
	accept?: string
	maxSize?: number // in bytes
	onFileChange?: (file: File | null) => void
}

export const FormImage = ({
	className,
	name,
	label,
	placeholder,
	required,
	accept = 'image/*',
	maxSize = 5 * 1024 * 1024, // 5MB
	onFileChange,
	disabled,
	...props
}: Props) => {
	const {
		register,
		formState: { errors },
		setValue,
		setError,
		clearErrors,
	} = useFormContext()

	const [preview, setPreview] = useState<string | null>(null)
	const [isDragOver, setIsDragOver] = useState<boolean>(false)

	const errorText = errors[name]?.message as string

	const validateFile = useCallback(
		(file: File): boolean => {
			// Check file type
			if (!file.type.startsWith('image/')) {
				setError(name, { message: 'The file must be an image' })

				return false
			}

			// Check file size
			if (file.size > maxSize) {
				const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0)
				setError(name, { message: 'The image size must be less than ' + maxSizeMB + 'MB' })

				return false
			}

			clearErrors(name)

			return true
		},

		[name, maxSize, setError, clearErrors],
	)

	const handleFileChange = useCallback(
		(file: File | null) => {
			if (file && !validateFile(file)) {
				return
			}

			setValue(name, file)
			onFileChange?.(file)

			if (file) {
				const reader = new FileReader()

				reader.onload = (e) => {
					setPreview(e.target?.result as string)
				}

				reader.readAsDataURL(file)
			} else {
				setPreview(null)
			}
		},

		[name, setValue, onFileChange, validateFile],
	)

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] ?? null

		handleFileChange(file)
	}

	const onClickClear = () => {
		setPreview(null)
		clearErrors(name)
		setValue(name, null)
		onFileChange?.(null)

		// Clear the file input
		const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement
		if (input) {
			input.value = ''
		}
	}

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault()
		setIsDragOver(true)
	}

	const handleDragLeave = (e: DragEvent) => {
		e.preventDefault()
		setIsDragOver(false)
	}

	const handleDrop = (e: DragEvent) => {
		e.preventDefault()
		setIsDragOver(false)

		if (disabled) return

		const file = e.dataTransfer.files?.[0] ?? null
		if (file) {
			handleFileChange(file)
		}
	}

	return (
		<Field className={className}>
			{label && (
				<FieldLabel htmlFor={name}>
					{label} {required && <RequiredSymbol />}
				</FieldLabel>
			)}

			<FieldContent>
				<div className='space-y-3'>
					{/* Drag & Drop zone */}
					<div
						role='button'
						tabIndex={0}
						aria-label={disabled ? 'Image upload disabled' : 'Upload image (click or drag and drop)'}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onKeyDown={(e) => {
							if (disabled) return

							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault()
								document.getElementById(name)?.click()
							}
						}}
						onClick={() => {
							if (!disabled) {
								document.getElementById(name)?.click()
							}
						}}
						className={cn(
							'relative rounded-xl border-2 border-dashed p-6 text-center transition-colors duration-300 ease-in-out',
							isDragOver ? 'border-primary bg-primary/5' : 'border-gray-300',
							disabled
								? 'cursor-not-allowed opacity-50'
								: 'hover:border-primary cursor-pointer hover:bg-gray-50',
						)}
					>
						<Input
							id={name}
							type='file'
							accept={accept}
							disabled={disabled}
							className='hidden'
							{...register(name, {
								onChange: onInputChange,
							})}
							{...props}
						/>

						{preview ? (
							<div className='relative'>
								<Image
									src={preview}
									alt='Preview'
									width={128}
									height={128}
									className='mx-auto max-h-32 max-w-full rounded object-cover'
									unoptimized
								/>

								<button
									type='button'
									onClick={(e) => {
										e.stopPropagation()
										onClickClear()
									}}
									disabled={disabled}
									className='absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600'
								>
									<XIcon className='size-4' />
								</button>
							</div>
						) : (
							<div className='space-y-2'>
								<div className='mx-auto size-12 text-gray-400'>
									<ImageIcon className='size-full' />
								</div>

								<div className='space-y-1'>
									<p className='text-sm font-medium'>{placeholder}</p>

									<p className='text-xs text-gray-500'>
										{'Supported formats: JPG, PNG, GIF (max. ' +
											(maxSize / (1024 * 1024)).toFixed(0) +
											' MB)'}
									</p>
								</div>

								<UploadIcon className='mx-auto size-6 text-gray-400' />
							</div>
						)}
					</div>

					{/* Hidden input for form submission */}
					<Input type='hidden' name={`${name}-placeholder`} />
				</div>
			</FieldContent>

			{errorText && <FieldError>{errorText}</FieldError>}
		</Field>
	)
}
