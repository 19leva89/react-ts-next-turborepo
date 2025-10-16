import { type Dispatch, type SetStateAction } from 'react'

import { ITaskResponse } from '@/types/task.types'

interface IListAddRowInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const ListAddRowInput = ({ setItems, filterDate }: IListAddRowInput) => {
	const addRow = () => {
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
		<div className="py-2 px-4 border-t border-border">
			<button
				onClick={addRow}
				className="italic opacity-40 text-sm cursor-pointer hover:opacity-60 transition-opacity ease-in-out duration-300"
			>
				Add task...
			</button>
		</div>
	)
}
