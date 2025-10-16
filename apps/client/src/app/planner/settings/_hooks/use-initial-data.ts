import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { useProfile } from '@/hooks/use-profile'
import { TypeUserForm } from '@/types/auth.types'

export function useInitialData(reset: UseFormReset<TypeUserForm>) {
	const { data, isSuccess } = useProfile()

	useEffect(() => {
		if (isSuccess && data) {
			reset({
				email: data.user.email,
				name: data.user.name,
				workInterval: data.user.workInterval,
				breakInterval: data.user.breakInterval,
				intervalsCount: data.user.intervalsCount,
			})
		}
	}, [isSuccess])
}
