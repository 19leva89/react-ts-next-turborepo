import { useProfile } from '@/hooks/use-profile'

export function useLoadSettings() {
	const { data } = useProfile()

	const workInterval = data?.user.workInterval ?? 50
	const breakInterval = data?.user.workInterval ?? 10

	return { workInterval, breakInterval }
}
