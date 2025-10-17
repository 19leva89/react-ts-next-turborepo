import { useMutation, useQueryClient } from '@tanstack/react-query'

import { timeBlockService } from '@/services/time-block.service'
import type { TypeTimeBlockFormState } from '@/types/time-block.types'

export function useUpdateTimeBlock(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateTimeBlock, isPending } = useMutation({
		mutationKey: ['update time-block', key],
		mutationFn: ({ id, data }: { id: string; data: TypeTimeBlockFormState }) =>
			timeBlockService.updateTimeBlock(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-blocks'],
			})
		},
	})

	return { updateTimeBlock, isPending }
}
