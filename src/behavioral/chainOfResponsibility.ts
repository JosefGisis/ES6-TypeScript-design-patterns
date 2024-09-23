/**
 * Chain of responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers.
 * This decouples senders and receivers of a request and promote loose coupling. The downside is that receipt of
 * a request is not guaranteed.
 *
 * Think of the way React components passes an error up the component tree. Usually the root component will catch
 * this error and will render the whole app as an error page. However, we can use an error boundary to catch the
 * error and render a specific error page. This is the equivalent of the chain of responsibility pattern and the
 * error boundary is the object that handles the error rather than passing it up the chain.
 *
 * Notice how the following example is similar to the composite pattern. The difference is that the chain of
 * responsibility pattern is used to pass a request up the chain of responsibility.
 */

// We will create an example of mock components that will pass an error up the chain of responsibility.

abstract class Widget {
	name: string

	constructor(name: string) {
		this.name = name
	}

	abstract addWidget(widget: Widget): void

	abstract getWidgets(): Widget[] | null

	abstract getSuccesor(): Widget | null

	abstract handleError(error: Error): void
}

// Leafs do not handle errors, they either create an error to pass up the chain.
class Leaf extends Widget {
	private successor: Widget

	constructor(name: string, successor: Widget) {
		super(name)
		this.successor = successor
	}

	getSuccesor(): Widget | null {
		return this.successor
	}

	addWidget() {
		this.successor.handleError(new Error('leaf widget cannot have children'))
		return null
	}

	getWidgets() {
		this.successor.handleError(new Error('leaf widget does not have content'))
		return null
	}

	// handleError in this case does not come from the chain. It must be called externally. Imagine it being called by a button click.
	handleError() {
		this.successor.handleError(new Error('leaf widget cannot handle errors'))
	}
}

// This is an error handling composite. It will handle errors and not pass them along the chain. This can be the root component, or some node along the way.
class ErrorHandlingComposite extends Widget {
	private successor: Widget | null
	private widgets: Widget[]

	constructor(name: string, successor: Widget | null) {
		super(name)
		this.successor = successor
		this.widgets = []
	}

	addWidget(widget: Widget) {
		this.widgets.push(widget)
	}

	getWidgets() {
		return this.widgets
	}

	getSuccesor() {
		return this.successor
	}

	handleError(error: Error) {
		console.error(`Error in ${this.name}: ${error.message}`)
	}
}

// This is a non-error handling composite. It will pass errors up the chain.
class NonErrorHandlingComposite extends Widget {
	private successor: Widget
	private widgets: Widget[]

	constructor(name: string, successor: Widget) {
		super(name)
		this.successor = successor
		this.widgets = []
	}

	addWidget(widget: Widget) {
		this.widgets.push(widget)
	}

	getWidgets() {
		return this.widgets
	}

	getSuccesor() {
		return this.successor
	}

	handleError(error: Error) {
		this.successor.handleError(error)
	}
}

// Usage. We will create a component tree with each node named so we can see where the error is passed to and eventually handled.
const root = new ErrorHandlingComposite('root', null)
const firstMainDiv = new NonErrorHandlingComposite('non-error handling div', root)
const secondMainDiv = new ErrorHandlingComposite('error handling div', root)
root.addWidget(firstMainDiv)
root.addWidget(secondMainDiv)
const firstLeaf = new Leaf('leaf', firstMainDiv)
firstMainDiv.addWidget(firstLeaf)
const secondLeaf = new Leaf('leaf', secondMainDiv)
secondMainDiv.addWidget(secondLeaf)
firstLeaf.getWidgets() // This will throw an error because a leaf cannot have children
secondLeaf.getWidgets() // This will throw an error because a leaf cannot have children

// The result will be that one error is handled by the error handling composite and the other is handled by the root as it is the
// first error handling node.
