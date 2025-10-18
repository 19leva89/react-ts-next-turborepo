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

	const handleResetSession = () => {
		timerState.setIsRunning(false)

		deleteSession(sessionsResponse!.data.id)
	}

	const handlePlayPause = () => {
		if (timerState.isRunning) {
			actions.pauseHandler()
		} else {
			actions.playHandler()
		}
	}

	const renderTimerControls = () => {
		if (isLoading) {
			return <LoaderIcon />
		}

		if (sessionsResponse?.data) {
			return (
				<>
					<PomodoroRounds
						rounds={rounds}
						nextRoundHandler={actions.nextRoundHandler}
						prevRoundHandler={actions.prevRoundHandler}
						activeRound={timerState.activeRound}
					/>

					<Button
						variant='ghost'
						size='icon-lg'
						disabled={actions.isUpdateRoundPending}
						onClick={handlePlayPause}
						className='opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100'
					>
						{timerState.isRunning ? <PauseIcon className='size-6' /> : <PlayIcon className='size-6' />}
					</Button>

					<Button
						variant='ghost'
						size='icon-lg'
						disabled={isDeletePending}
						onClick={handleResetSession}
						className='absolute right-0 top-0 opacity-40 transition-opacity duration-300 ease-in-out hover:opacity-90'
					>
						<RefreshCcwIcon className='size-5' />
					</Button>
				</>
			)
		}

		return (
			<Button onClick={() => mutate()} disabled={isPending}>
				Create session
			</Button>
		)
	}

	return (
		<div className='relative mx-2 flex w-80 flex-col items-center gap-4'>
			{!isLoading && <div className='text-7xl font-semibold'>{formatTime(timerState.secondsLeft)}</div>}

			{renderTimerControls()}
		</div>
	)
}
