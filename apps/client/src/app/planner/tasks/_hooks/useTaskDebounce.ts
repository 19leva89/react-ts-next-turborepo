import debounce from 'lodash.debounce'
import { UseFormWatch } from 'react-hook-form'
import { useCallback, useEffect, useMemo } from 'react'

import { useCreateTask } from './useCreateTask'
import { useUpdateTask } from './useUpdateTask'
import { TypeTaskFormState } from '@/types/task.types'

interface IUseTaskDebounce {
	watch: UseFormWatch<TypeTaskFormState>
	itemId: string
}

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {
	const { createTask } = useCreateTask()
	const { updateTask } = useUpdateTask()

	// Extract inner callbacks with explicit deps
	const createTaskFn = useCallback(
		(formData: TypeTaskFormState) => {
			createTask(formData)
		},
		[createTask],
	)

	const updateTaskFn = useCallback(
		(formData: TypeTaskFormState) => {
			updateTask({ id: itemId, data: formData })
		},
		[updateTask, itemId], // Track both deps
	)

	// Memoize the debounced versions
	const debouncedCreateTask = useMemo(
		() => debounce(createTaskFn, 444),
		[createTaskFn], // Only recreate if inner fn changes
	)

	const debouncedUpdateTask = useMemo(
		() => debounce(updateTaskFn, 444),
		[updateTaskFn], // Only recreate if inner fn changes
	)

	useEffect(() => {
		const { unsubscribe } = watch((formData) => {
			if (itemId) {
				debouncedUpdateTask({
					...formData,
					priority: formData.priority || undefined,
				})
			} else {
				debouncedCreateTask(formData)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch, debouncedUpdateTask, debouncedCreateTask, itemId])
}
