'use client'

import { Loader, Pause, Play, RefreshCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { formatTime } from './format-time'
import { useTimer } from '../_hooks/use-timer'
import { PomodoroRounds } from './pomodoro-rounds'
import { useCreateSession } from '../_hooks/use-create-session'
import { useDeleteSession } from '../_hooks/use-delete-session'
import { useTimerActions } from '../_hooks/use-timer-actions'
import { useTodaySession } from '../_hooks/use-today-session'

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
		<div className="relative w-80 text-center">
			{!isLoading && <div className="text-7xl font-semibold">{formatTime(timerState.secondsLeft)}</div>}
			{isLoading ? (
				<Loader />
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
						className="mt-6 cursor-pointer opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-300"
					>
						{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button>

					<button
						disabled={isDeletePending}
						onClick={() => {
							timerState.setIsRunning(false)
							deleteSession(sessionsResponse.data.id)
						}}
						className="absolute top-0 right-0 cursor-pointer opacity-40 hover:opacity-90 transition-opacity ease-in-out duration-300"
					>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button onClick={() => mutate()} className="mt-1" disabled={isPending}>
					Create session
				</Button>
			)}
		</div>
	)
}
