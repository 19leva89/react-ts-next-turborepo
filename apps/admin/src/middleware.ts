import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

import { authRoutes, DEFAULT_LOGIN_REDIRECT, protectedRoutes } from '@/routes'

const secret = process.env.AUTH_SECRET

export async function middleware(req: NextRequest) {
	const { nextUrl } = req
	const { origin, pathname, protocol, search } = req.nextUrl

	const isAuthRoute = authRoutes.includes(pathname)
	const isProtected = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

	//! Important to set secureCookie
	const token = await getToken({ req, secret, secureCookie: protocol === 'https:' })
	const isLoggedIn = !!token

	// 1. If it's an authorization route and the user is already logged in, redirect
	if (isAuthRoute) {
		if (isLoggedIn) {
			// Redirect logged-in users away from auth routes
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}

		// Allow unauthenticated users to access auth routes
		return NextResponse.next()
	}

	// 2. If this is a secure route and the user is not logged in, redirect to '/not-auth'
	if (!isLoggedIn && isProtected) {
		const absoluteURL = new URL('/auth/sign-in', origin)

		absoluteURL.searchParams.set('callbackUrl', `${pathname}${search}`)

		return NextResponse.redirect(absoluteURL)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
}
