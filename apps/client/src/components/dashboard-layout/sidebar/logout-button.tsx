'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
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
		<div className='absolute right-1 top-1'>
			<button
				onClick={() => mutate()}
				className='cursor-pointer opacity-20 transition-opacity duration-300 ease-in-out hover:opacity-100'
			>
				<LogOut size={20} />
			</button>
		</div>
	)
}
