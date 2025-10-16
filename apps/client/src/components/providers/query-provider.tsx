'use client'

import { PropsWithChildren, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const QueryProvider = ({ children }: PropsWithChildren) => {
	const [client] = useState<QueryClient>(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		}),
	)

	return (
		<QueryClientProvider client={client}>
			{children}

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
