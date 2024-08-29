/**
 * The Decorator design pattern allows behavior to be added to individual objects dynamically and
 * is a good way to avoid subclassing to achieve extensibility. It does this by wrapping an object
 * in an invisible object (that is, its interface conforms to the one the client expects).
 * Because the "wrapper" is invisible, you can recursively wrap objects in wrappers, which allows
 * for an unlimited number of added responsibilities.
 *
 * Wrapper are subclasses of the decorator class and are used to add responsibilities to the component.
 * Decorator class creates an invisible wrapper around the component and is subclassed to
 * add responsibilities.
 * One way of doing this is by making the decorator class an abstract class that extends the component
 * class and forwards all requests to the component. See code.
 *
 * AKA: Wrapper
 */

// Component interface
abstract class TextManager {
	abstract getText(): string
}

// Concrete Component
class ExampleText implements TextManager {
	getText(): string {
		return 'Hello World'
	}
}

abstract class Decorator extends TextManager {
	protected textManager: TextManager
	constructor(textManager: TextManager) {
		super()
		this.textManager = textManager
	}
	getText(): string {
		return this.textManager.getText()
	}
}

// Concrete Decorator
class DunderDecorator extends Decorator {
	constructor(textManager: TextManager) {
		super(textManager)
	}
	override getText(): string {
		return `__${this.textManager.getText()}__`
	}
}

// Concrete Decorator
class StarDecorator extends Decorator {
	constructor(textManager: TextManager) {
		super(textManager)
	}
	override getText(): string {
		return `**${this.textManager.getText()}**`
	}
}

// Usage
const exampleText = new ExampleText()
const dunderDecorator = new DunderDecorator(exampleText)
const dunderDunderDecorator = new DunderDecorator(dunderDecorator)
const starDunderDunderDecorator = new StarDecorator(dunderDunderDecorator)
console.log(starDunderDunderDecorator.getText()) // **__Hello World__**

const dunderStarDunderDunderDecorator = new DunderDecorator(starDunderDunderDecorator)
console.log(dunderStarDunderDunderDecorator.getText()) // __**__Hello World__**__
// See. We can keep adding decorators to the component without changing the component itself.
