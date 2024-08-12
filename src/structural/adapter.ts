/**
 * The adapter pattern allow an object (the adoptee) to be able to be used with client code that expects a different interface.
 * The adapter can be done through a class which subclasses the adoptee, or it can be done through object composition (in which
 * case a delegate transforms the expected object).
 *
 * Two-way adapters can be used to easily swap interfaces in both directions.
 * Pluggable adapters are adapters that are contained in the adaptee. This is the case when the adaptee needs to make minimal
 * assumptions about the interfaces clients expect.
 */

// Class Adapter
// Adaptee
class LegacyMessage {
	private message: string
	constructor() {
		this.message = 'hello, world!'
	}
	print_message() {
		console.log(this.message)
	}
	get_message() {
		return this.message
	}
}

// Adapter
class MessageAdapter {
	private legacyMessage: LegacyMessage

	constructor() {
		this.legacyMessage = new LegacyMessage()
	}
	printMessage() {
		this.legacyMessage.print_message()
	}
	getMessage() {
		return this.legacyMessage.get_message()
	}
}

// Usage
const message = new MessageAdapter()
message.printMessage()

// Object Adapter
// Adaptee
type PersonType = {
	first_name: string
	last_name: string
	birth_date: string
}
const data: { first_name: string; last_name: string; birth_date: string } = {
	first_name: 'John',
	last_name: 'Doe',
	birth_date: '01/01/1970',
}

// This adapter is a two-way adapter
class DataCaseAdapter {
	private data: any

	constructor(data: any) {
		this.data = data
	}

	convertDataToCamel() {
		Object.entries(this.data).forEach(([key, value]) => {
			const convertedKey = key.replace(/_([a-z])/g, (match) => match.slice(1).toUpperCase())
			delete this.data[key]
			this.data[convertedKey] = value
		}, {})
	}

	converDataToSnake() {
		Object.entries(this.data).forEach(([key, value]) => {
			const convertedKey = key.replace(/([A-Z])/g, (match) => '_' + match.toLowerCase())
			delete this.data[key]
			this.data[convertedKey] = value
		}, {})
	}

	getData() {
		return this.data
	}
}

const adapter = new DataCaseAdapter(data)
adapter.convertDataToCamel()
console.log(adapter.getData())
adapter.converDataToSnake()
console.log(adapter.getData())
