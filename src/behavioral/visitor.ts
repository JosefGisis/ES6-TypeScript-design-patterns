/**
 * Visitor pattern encapsulates the methods in an object, so they are easier to understand
 * and modify. It is useful when you have a complex object structure and each object has
 * different methods that need to be called. The visitor contains the methods for the object structure
 * and the object structure contains the accept method that calls the visitor's method. The visitor
 * "visits" and "lends" its methods to the object.
 *
 * This pattern makes it easier to add new methods and simplifies the object structure. It also good
 * for separating concerns. The object structure does not need to know about the visitor's methods.
 * However, the visitor violates the encapsulation principle because it contains the methods for the
 * object structure.
 */

// The abstract visitor class contains methods for each element in the object structure.
abstract class TextElementVisitor {
	abstract visitHelloWorldElement(): void
	abstract visitEggsAndSpamElement(): void
	abstract visitFooAndBarElement(): void
}

// We only have one operation in this example, but in a more complex system, we would have more operations (meaning more subclasses of TextElementVisitor).
class TextElementVisitorLogger extends TextElementVisitor {
	visitHelloWorldElement(): void {
		console.log('Hello world')
	}

	visitEggsAndSpamElement(): void {
		console.log('Eggs and Spam')
	}

	visitFooAndBarElement(): void {
		console.log('Foo and Bar')
	}
}

// The object structure contains the accept method that calls the visitor's method.
abstract class TextElement {
	abstract accept(visitor: TextElementVisitor): void
}

class HelloWorldElement extends TextElement {
	accept(visitor: TextElementVisitor): void {
		visitor.visitHelloWorldElement()
	}
}

class EggsAndSpamElement extends TextElement {
	accept(visitor: TextElementVisitor): void {
		visitor.visitEggsAndSpamElement()
	}
}

class FooAndBarElement extends TextElement {
	accept(visitor: TextElementVisitor): void {
		visitor.visitFooAndBarElement()
	}
}

// Usage (client)
const visitor = new TextElementVisitorLogger()

const helloWorldElement = new HelloWorldElement()
const eggsAndSpamElement = new EggsAndSpamElement()
const fooAndBarElement = new FooAndBarElement()
const textElements: TextElement[] = [helloWorldElement, eggsAndSpamElement, fooAndBarElement]

textElements.forEach((element) => {
	element.accept(visitor)
})
