import { useEffect, useState } from 'react'

import { useLoadSettings } from './use-load-settings'
import type { ITimerState } from '../_components/timer.types'
import type { IPomodoroRoundResponse } from '@/types/pomodoro.types'

export function useTimer(): ITimerState {
	const { breakInterval, workInterval } = useLoadSettings()

	const [isRunning, setIsRunning] = useState<boolean>(false)
	const [isBreakTime, setIsBreakTime] = useState<boolean>(false)
	const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>()
	const [secondsLeft, setSecondsLeft] = useState<number>(workInterval * 60)

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft((secondsLeft) => secondsLeft - 1)
			}, 1000)
		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isRunning, secondsLeft, workInterval, activeRound])

	useEffect(() => {
		// Ранний выход, если время не истекло
		if (secondsLeft > 0) return

		// Переключение режима и установка нового времени одной операцией
		setIsBreakTime(!isBreakTime)
		setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60)
	}, [secondsLeft, isBreakTime, workInterval, breakInterval])

	return {
		activeRound,
		secondsLeft,
		setActiveRound,
		setIsRunning,
		setSecondsLeft,
		isRunning,
	}
}
