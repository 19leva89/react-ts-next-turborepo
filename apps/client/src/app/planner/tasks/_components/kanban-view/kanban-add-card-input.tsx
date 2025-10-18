import { type Dispatch, type SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'

interface IKanbanAddCardInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const KanbanAddCardInput = ({ setItems, filterDate }: IKanbanAddCardInput) => {
	const addCard = () => {
		setItems((prev) => {
			if (!prev) return

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate,
				},
			]
		})
	}

	return (
		<div className='mt-5'>
			<button
				onClick={addCard}
				className='text-sm italic opacity-40 transition-opacity duration-300 ease-in-out hover:opacity-60'
			>
				Add task...
			</button>
		</div>
	)
}
