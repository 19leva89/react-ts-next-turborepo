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
		<div className='border-border border-t px-4 py-2'>
			<button
				onClick={addRow}
				className='text-sm italic opacity-40 transition-opacity duration-300 ease-in-out hover:opacity-60'
			>
				Add task...
			</button>
		</div>
	)
}
