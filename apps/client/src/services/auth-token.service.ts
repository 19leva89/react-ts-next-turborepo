import Cookies from 'js-cookie'

// Cookie on Client side
const COOKIE_DOMAIN = process.env.SERVER_API_URL

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)

	// For debugging
	if (process.env.NODE_ENV !== 'production') {
		console.log('accessToken client:', accessToken)
	}

	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: COOKIE_DOMAIN,
		expires: 1,
		secure: true,
		sameSite: 'none',
	})
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN, {
		domain: COOKIE_DOMAIN,
		secure: true,
		sameSite: 'none',
	})
}
