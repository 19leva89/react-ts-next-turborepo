import { NextRequest, NextResponse } from 'next/server'

import { EnumTokens } from './services/auth-token.service'
import { DASHBOARD_PAGES } from './config/pages-url.config'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (pathname.startsWith('/planner')) {
		const token = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

		if (!token) {
			return NextResponse.redirect(new URL('/auth', request.url))
		}
	}

	if (pathname.startsWith('/auth')) {
		const token = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

		if (token) {
			return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/planner/:path*', '/auth/:path*'],
}
