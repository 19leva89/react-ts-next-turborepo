import { cn } from '@repo/ui/lib'
import { Button } from '@repo/ui/components'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { IPomodoroRoundResponse } from '@/types/pomodoro.types'

interface IPomodoroRounds {
	rounds: IPomodoroRoundResponse[] | undefined
	activeRound: IPomodoroRoundResponse | undefined
	nextRoundHandler: () => void
	prevRoundHandler: () => void
}

export const PomodoroRounds = ({
	rounds,
	nextRoundHandler,
	prevRoundHandler,
	activeRound,
}: IPomodoroRounds) => {
	const isCanPrevRound = rounds ? rounds.some((round) => round.isCompleted) : false
	const isCanNextRound = rounds ? !rounds[rounds.length - 1]?.isCompleted : false

	return (
		<div className='flex items-center justify-center gap-2'>
			<Button
				variant='ghost'
				size='icon-lg'
				disabled={!isCanPrevRound}
				onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
				className='opacity-20 transition-opacity duration-300 ease-in-out hover:opacity-100 disabled:opacity-20'
			>
				<ChevronLeftIcon className='size-6' />
			</Button>

			<div className='flex items-center justify-center gap-3'>
				{rounds &&
					rounds.map((round, index) => (
						<div
							key={index}
							className={cn(
								'border-border before:bg-primary relative size-5 rounded before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:rounded-l before:transition-all before:duration-300',
								{
									border: true,
									'before:w-full before:rounded': round.isCompleted,
									'before:w-[40%] before:duration-1000': round.id === activeRound?.id && !round.isCompleted,
								},
							)}
						/>
					))}
			</div>

			<Button
				variant='ghost'
				size='icon-lg'
				disabled={!isCanNextRound}
				onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
				className='opacity-20 transition-opacity duration-300 ease-in-out hover:opacity-100 disabled:opacity-20'
			>
				<ChevronRightIcon className='size-6' />
			</Button>
		</div>
	)
}
