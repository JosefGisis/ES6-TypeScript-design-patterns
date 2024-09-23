/**
 * Command encapsulates the a request an object. Rather than directly calling a method from an object and coupling/limiting that command
 * (say, there are a given number of argument type), we create a command class and subclasses to encapsulate the request. An invoker calls
 * that requests and the receiver and command handle it from there.
 *
 * Think of a react button component. Rather than binding the receiver and the request directly, we can create a command class that is invoked
 * by a third party (in this case the button component). Now we can call that command from anywhere and move it at will without changing the
 * button component. We can also easily add and subtract commands (such as onCLick, onHover, etc) without changing the button component.
 */

// We create a user object that has several requests. Invokers will create requests and pass them to the user object.
class User {
	private name: string
	private gender: 'male' | 'female'
	private age: number | 'a lady never tells' = 'a lady never tells'

	constructor(name: string, gender: 'male' | 'female') {
		this.name = name
		this.gender = gender
	}

	setName(name: string) {
		this.name = name
	}

	setGender(gender: 'male' | 'female') {
		this.gender = gender
	}

	setAge(age: number | 'a lady never tells') {
		this.age = age
	}

	getInfo() {
		return {
			name: this.name,
			gender: this.gender,
			age: this.age,
		}
	}
}

abstract class Request {
	protected receiver: any

	constructor(receiver: any) {
		this.receiver = receiver
	}

	abstract execute(): void
}

class SetAgeRequest extends Request {
	private age: number | 'a lady never tells'

	constructor(receiver: User, age: number | 'a lady never tells') {
		super(receiver)
		this.age = age
	}

	getReceiver() {
		return this.receiver
	}

	execute() {
		this.receiver.setAge(this.age)
	}
}

class SetGenderRequest extends Request {
	private gender: 'male' | 'female'

	constructor(receiver: User, gender: 'male' | 'female') {
		super(receiver)
		this.gender = gender
	}

	getReceiver() {
		return this.receiver
	}

	execute() {
		this.receiver.setGender(this.gender)
	}
}

// usage
const josefGisis = new User('Yossi', 'female')
const setAgeRequest = new SetAgeRequest(josefGisis, 'a lady never tells')
setAgeRequest.execute()
const setGenderRequest = new SetGenderRequest(josefGisis, 'male')
setGenderRequest.execute()
console.log(josefGisis.getInfo())

export {}
