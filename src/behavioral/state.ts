/**
 * The State design pattern allows an object to change its behavior when its internal state changes.
 * While it is possible for an object to change its behavior by having large conditional statements,
 * this can be hard to understand and difficult to maintain. The State pattern delegates the behavior
 * to an external object.
 */

// Welcome message will be a large mutli-part message for a website. The message will be different if
// the user is logged in, or a new user, or if there is a special promotion, etc.
type WelcomeBannerStateOptions = 'visitor' | 'newUser' | 'returningUser' | 'specialPromotion'
class WelcomeBanner {
	private state: WelcomeBannerStateOptions = 'visitor'
	private userName: string = ''
	// Another way of managing bannerState would be to create a map and create them all at once.
	// This would allow for quicker switching between states, but would use more memory.
	// The method below is more memory efficient, but slower, and if your language does not support
	// automatic garbage collection, you would need to manually delete the old state.
	private bannerState: BannerState | null = null

	public setState(state: WelcomeBannerStateOptions, userName: string = '') {
		this.state = state
		switch (this.state) {
			case 'newUser': {
				if (!userName) {
					console.log('There was an error logging in, please try again later.')
					return
				}
				this.userName = userName
				this.bannerState = new NewUserState()
				break
			}
			case 'returningUser': {
				if (!userName) {
					console.log('There was an error logging in, please try again later.')
					return
				}
				this.userName = userName
				this.bannerState = new ReturningUserState()
				break
			}
			case 'specialPromotion': {
				if (!userName) {
					console.log('There was an error logging in, please try again later.')
					return
				}
				this.userName = userName
				this.bannerState = new SpecialPromotionState()
				break
			}
			case 'visitor': {
				this.bannerState = new VisitorState()
				break
			}
			default: {
				this.bannerState = new VisitorState()
				break
			}
		}
	}

	public renderBanner() {
		this.bannerState?.renderBanner(this.userName)
	}
}

abstract class BannerState {
	abstract renderBanner(userName: string | null): void
}

class VisitorState extends BannerState {
	renderBanner(_userName: string | null) {
		console.log('Welcome to our website!')
	}
}

class NewUserState extends BannerState {
	renderBanner(userName: string | null) {
		if (!userName) {
			console.log('There was an error logging in, please try again later.')
			return
		}
		console.log(`Welcome ${userName}! Thank you for sigining up!`)
	}
}

class ReturningUserState extends BannerState {
	renderBanner(userName: string | null) {
		if (!userName) {
			console.log('There was an error logging in, please try again later.')
			return
		}
		console.log(`Welcome back ${userName}!`)
	}
}

class SpecialPromotionState extends BannerState {
	renderBanner(userName: string | null) {
		if (!userName) {
			console.log('There was an error logging in, please try again later.')
			return
		}
		console.log(`Welcome back ${userName}! We appreciate your patronage. Paste DISCOUNT10 at checkout for 10% off!`)
	}
}

// Usage (client code)
const welcomeBanner = new WelcomeBanner()
welcomeBanner.setState('visitor')
welcomeBanner.renderBanner()
welcomeBanner.setState('newUser', 'Josef Gisis')
welcomeBanner.renderBanner()
welcomeBanner.setState('returningUser', 'Josephina Gisis')
welcomeBanner.renderBanner()
welcomeBanner.setState('specialPromotion', 'Josefesoj Gisis')
welcomeBanner.renderBanner()
