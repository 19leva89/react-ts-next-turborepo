export function formatTime(secondsLeft: number) {
	const seconds = secondsLeft % 60
	const minutes = Math.floor(secondsLeft / 60)

	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
