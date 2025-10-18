'use client'

import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/components'
import { useMutation } from '@tanstack/react-query'

import { authService } from '@/services/auth.service'

export const LogoutButton = () => {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth'),
	})

	return (
		<Button
			variant='outline'
			size='icon-lg'
			onClick={() => mutate()}
			className='transition-colors duration-300 ease-in-out'
		>
			<LogOutIcon size={20} />
		</Button>
	)
}
