'use client'

import { Button } from '@repo/ui/components'
import { LoaderIcon, PauseIcon, PlayIcon, RefreshCcwIcon } from 'lucide-react'

import { formatTime } from './format-time'
import { useTimer } from '../_hooks/use-timer'
import { PomodoroRounds } from './pomodoro-rounds'
import { useTimerActions } from '../_hooks/use-timer-actions'
import { useTodaySession } from '../_hooks/use-today-session'
import { useCreateSession } from '../_hooks/use-create-session'
import { useDeleteSession } from '../_hooks/use-delete-session'

export const Pomodoro = () => {
	const timerState = useTimer()
	const { isLoading, sessionsResponse, workInterval } = useTodaySession(timerState)

	const rounds = sessionsResponse?.data.rounds
	const actions = useTimerActions({ ...timerState, rounds })

	const { isPending, mutate } = useCreateSession()
	const { deleteSession, isDeletePending } = useDeleteSession(() =>
		timerState.setSecondsLeft(workInterval * 60),
	)

	return (
		<div className='relative w-80 text-center'>
			{!isLoading && <div className='text-7xl font-semibold'>{formatTime(timerState.secondsLeft)}</div>}

			{isLoading ? (
				<LoaderIcon />
			) : sessionsResponse?.data ? (
				<>
					<PomodoroRounds
						rounds={rounds}
						nextRoundHandler={actions.nextRoundHandler}
						prevRoundHandler={actions.prevRoundHandler}
						activeRound={timerState.activeRound}
					/>

					<button
						disabled={actions.isUpdateRoundPending}
						onClick={timerState.isRunning ? actions.pauseHandler : actions.playHandler}
						className='mt-6 cursor-pointer opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100'
					>
						{timerState.isRunning ? <PauseIcon size={30} /> : <PlayIcon size={30} />}
					</button>

					<button
						disabled={isDeletePending}
						onClick={() => {
							timerState.setIsRunning(false)
							deleteSession(sessionsResponse.data.id)
						}}
						className='absolute right-0 top-0 cursor-pointer opacity-40 transition-opacity duration-300 ease-in-out hover:opacity-90'
					>
						<RefreshCcwIcon size={19} />
					</button>
				</>
			) : (
				<Button onClick={() => mutate()} className='mt-1' disabled={isPending}>
					Create session
				</Button>
			)}
		</div>
	)
}
