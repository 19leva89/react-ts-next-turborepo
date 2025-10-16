import { forwardRef } from 'react'

interface InputFieldProps {
	id: string
	label: string
	placeholder: string
	extra?: string
	variant?: string
	state?: 'error' | 'success'
	disabled?: boolean
	type?: string
	isNumber?: boolean
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	({ label, id, extra, type, placeholder, state, disabled, isNumber, ...rest }, ref) => {
		return (
			<div className={`${extra}`}>
				<label htmlFor={id} className={`ml-1.5 text-sm font-medium text-black/80 dark:text-white`}>
					{label}
				</label>

				<input
					ref={ref}
					disabled={disabled}
					type={type}
					id={id}
					placeholder={placeholder}
					className={`border-border outline-hidden focus:border-primary mt-2 flex w-full items-center justify-center rounded-lg border bg-white/0 p-3 text-base transition-colors duration-500 placeholder:font-normal placeholder:text-white/30 ${
						disabled === true
							? 'border-none! bg-gray-100! dark:bg-white/5! dark:placeholder:text-[rgba(255,255,255,0.15)]!'
							: state === 'error'
								? 'dark:border-red-400! dark:text-red-400! dark:placeholder:text-red-400! border-red-500 text-red-500 placeholder:text-red-500'
								: state === 'success'
									? 'dark:border-green-400! dark:text-green-400! dark:placeholder:text-green-400! border-green-500 text-green-500 placeholder:text-green-500'
									: ''
					}`}
					onKeyDown={(event) => {
						if (
							isNumber &&
							!/[0-9]/.test(event.key) &&
							event.key !== 'Backspace' &&
							event.key !== 'Tab' &&
							event.key !== 'Enter' &&
							event.key !== 'ArrowLeft' &&
							event.key !== 'ArrowRight'
						) {
							event.preventDefault()
						}
					}}
					{...rest}
				/>
			</div>
		)
	},
)

Field.displayName = 'field'
