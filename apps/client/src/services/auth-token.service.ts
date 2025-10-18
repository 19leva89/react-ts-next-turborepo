import Cookies from 'js-cookie'

const getClientCookieDomain = () => {
	if (typeof window === 'undefined') return 'localhost' // SSR-safe
	const hostname = window.location.hostname

	return hostname === 'localhost' ? 'localhost' : `.${hostname}`
}

// Cookie on Client side
const COOKIE_DOMAIN = getClientCookieDomain()

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

export const getAccessToken = () => {
	let accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)

	if (!accessToken) {
		accessToken = localStorage.getItem(EnumTokens.ACCESS_TOKEN) // Fallback
	}

	if (process.env.NODE_ENV !== 'production') {
		console.log('accessToken client:', accessToken)
	}

	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	console.log('Saving accessToken with domain:', COOKIE_DOMAIN) // Debug

	try {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: COOKIE_DOMAIN,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // lax if production
		})
	} catch (e) {
		console.warn('Cookie failed, fallback to localStorage:', e)

		localStorage.setItem(EnumTokens.ACCESS_TOKEN, accessToken) // Fallback
	}
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN, {
		domain: COOKIE_DOMAIN,
		secure: process.env.NODE_ENV === 'production',
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // lax if production
	})

	localStorage.removeItem(EnumTokens.ACCESS_TOKEN) // Fallback
}
