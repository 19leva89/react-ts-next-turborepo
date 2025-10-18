import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { Noto_Sans } from 'next/font/google'
import { Toaster } from '@repo/ui/components'

import { SITE_NAME } from '@/constants/seo.constants'
import { QueryProvider } from '@/components/providers'

import '@repo/ui/globals.css'

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal'],
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: 'Best one for planning',
}

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<html lang='en'>
			<body className={zen.className}>
				<QueryProvider>
					{children}

					<Toaster position='bottom-right' duration={1500} expand={false} richColors />
				</QueryProvider>
			</body>
		</html>
	)
}

export default RootLayout
