import { Profile } from './profile'
import { GlobalLoader } from './global-loader'

export const Header = () => {
	return (
		<header>
			<GlobalLoader />

			<Profile />
		</header>
	)
}
