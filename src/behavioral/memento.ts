/**
 * Memento stores an objects state without violating encapsulation, so it can be restored later.
 * This memento is a snapshot of an objects values at a particular time and is used for undo/redo
 * functionality.
 *
 * This is similar (although not the same) to React's useRef hook which allows us to store a mutable
 * value in a component. This value does not change on re-renders, so it is useful for restoring or
 * comparing previous values. It is not the same as memento because its value is not encapsulated.
 */

type GenderType = 'male' | 'female'
interface UserType {
	name: string
	gender: GenderType
	age: number
}
class UserOriginator {
	private user: UserType

	public constructor(user: UserType) {
		this.user = user
	}

	public setUser(user: UserType) {
		this.user = user
	}

	public getUser() {
		return this.user
	}

	public createMemento() {
		const memento = new UserMemento(this)
		memento.setState(this, this.user)
		return memento
	}

	public restoreState(memento: UserMemento) {
		const oldState = memento.getState(this)
		if (!oldState) {
			console.log('can restore state from provided memento as it is null')
			return
		}
		this.user = oldState
	}
}

class UserMemento {
	private state: UserType | null
	private originator: UserOriginator

	public constructor(originator: UserOriginator) {
		this.state = null
		this.originator = originator
	}

	public setState(originator: UserOriginator, state: UserType): void {
		if (originator === this.originator) {
			this.state = state
			return
		}
		console.log('only the instantiating originator can set or get memento state')
	}

	public getState(originator: UserOriginator): typeof this.state | void {
		if (originator === this.originator) return this.state
		console.log('only the instantiating originator can set or get memento state')
	}
}

// usage
const johnUser = new UserOriginator({ name: 'John Doe', gender: 'male', age: 25 })
const janeUser = new UserOriginator({ name: 'Jane Doe', gender: 'female', age: 21 })
console.log(johnUser.getUser())
const johnMemento = johnUser.createMemento()
johnUser.setUser({ ...johnUser.getUser(), age: 30 })
console.log(johnUser.getUser())
janeUser.restoreState(johnMemento)
johnUser.restoreState(johnMemento)
console.log(johnUser.getUser())

export {}
