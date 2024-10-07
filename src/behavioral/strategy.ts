/**
 * Strategy defines a set of interchangeable algorithms that is selected by the client. Rather than
 * implementing the logic directly in the client (or even create a central strategy class with large
 * conditional statement), the algorithms are encapsulated in their own classes and the client can set
 * the algorithm that it uses.
 */

// Context is not really necessary in this example because it is really simple, but it is included to
// demonstrate how a more complex system would use the strategy pattern (say the strategy requires a lot more data).
// Contexts can pass themselves to the strategy to allow the strategy to access the context's data.
class Context {
	private strategy: RemoveSpacesStrategy
	private string: string

	constructor(strategy: RemoveSpacesStrategy) {
		this.strategy = strategy
		this.string = ''
	}

	setString(str: string) {
		this.string = str
	}

	getString(): string {
		return this.string
	}

	setStrategy(strategy: RemoveSpacesStrategy) {
		this.strategy = strategy
	}

	removeSpaces(): void {
		this.string = this.strategy.execute(this.string)
	}
}

// Strategy interface
abstract class RemoveSpacesStrategy {
	abstract execute(str: string): string
}

class RemoveSpaceLiterals extends RemoveSpacesStrategy {
	execute(str: string): string {
		return str.replace(/ /g, '')
	}
}

class RemoveWhiteSpaceCharacters extends RemoveSpacesStrategy {
	execute(str: string): string {
		return str.replace(/\/s/g, '')
	}
}

// Usage (client)
const context = new Context(new RemoveSpaceLiterals())
context.setString('Hello World')
context.removeSpaces()
console.log(context.getString())

context.setStrategy(new RemoveWhiteSpaceCharacters())
context.setString('Hello/sWorld')
context.removeSpaces()
console.log(context.getString())

export {}
