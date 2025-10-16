import { cn } from '@repo/ui/lib'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
			<button
				disabled={!isCanPrevRound}
				onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
				className='mt-1 cursor-pointer opacity-20 transition-opacity duration-300 ease-in-out hover:opacity-100 disabled:opacity-20'
			>
				<ChevronLeft size={23} />
			</button>

			<div className='mt-1 flex items-center justify-center gap-3'>
				{rounds &&
					rounds.map((round, index) => (
						<div
							key={index}
							className={cn(
								'border-border before:bg-primary relative h-5 w-5 rounded before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:rounded-l before:transition-all before:duration-300',
								{
									border: true,
									'before:w-full before:rounded': round.isCompleted,
									'before:w-[40%] before:duration-1000': round.id === activeRound?.id && !round.isCompleted,
								},
							)}
						/>
					))}
			</div>

			<button
				disabled={!isCanNextRound}
				onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
				className='mt-1 cursor-pointer opacity-20 transition-opacity duration-300 ease-in-out hover:opacity-100 disabled:opacity-20'
			>
				<ChevronRight size={23} />
			</button>
		</div>
	)
}
