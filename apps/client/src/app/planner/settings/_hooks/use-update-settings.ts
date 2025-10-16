import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeUserForm } from '@/types/auth.types'
import { userService } from '@/services/user.service'

export function useUpdateSettings() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeUserForm) => userService.update(data),
		onSuccess() {
			toast.success('Successfully update profile!')

			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
	})

	return { mutate, isPending }
}
