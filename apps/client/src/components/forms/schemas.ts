import { z } from 'zod'

const errMsg = {
	email: 'Please enter a valid email address',
	name: 'Enter your name',
}

// Scheme for password
const passwordSchema = z
	.string()
	.min(8, { message: 'Password must be at least 8 characters long' })
	.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
	.regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
	.regex(/\d/, { message: 'Password must contain at least one digit' })

// Scheme for login
export const AuthSchema = z.object({
	email: z.email({ message: errMsg.email }),
	password: passwordSchema,
})

export const UserSchema = z.object({
	name: z.string().min(2, { message: errMsg.name }).optional().or(z.literal('')),
	email: z.email({ message: errMsg.email }).min(1),
	password: passwordSchema.optional().or(z.literal('')),
	workInterval: z.coerce.number().min(5, { message: 'Work interval must be at least 5 minutes' }),
	breakInterval: z.coerce.number().min(5, { message: 'Break interval must be at least 5 minutes' }),
	intervalsCount: z.coerce
		.number()
		.min(1, { message: 'Intervals count must be at least 1' })
		.max(10, { message: 'Intervals count must be at most 10' }),
})

export const TimeBlockSchema = z.object({
	id: z.string().optional().or(z.literal('')),
	name: z.string().min(2, { message: errMsg.name }).optional().or(z.literal('')),
	duration: z.coerce.number().min(5, { message: 'Duration must be at least 5 minutes' }),
	color: z.string().optional().or(z.literal('')),
	order: z.coerce.number().min(1, { message: 'Order must be at least 1' }),
})

export type TAuthValues = z.infer<typeof AuthSchema>
export type TUserValues = z.infer<typeof UserSchema>
export type TTimeBlockValues = z.infer<typeof TimeBlockSchema>
