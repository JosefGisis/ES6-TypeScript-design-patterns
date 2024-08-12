/**
 * The bride design pattern decouples an interface from its implementation so that the two can vary independently.
 * This is useful when implementation details can vary independently from the interface. An example would be an SDK
 * that can be used with different operating systems. The bridge pattern can be used to abstract the operating system
 * details from the SDK, so developers can use the SDK without worrying about the underlying operating system.
 */

/**
 * In this example: we should be able to make or return payments without concerning ourselves as to how those payments
 * are processed. So instead of subclassing the payment processor, we use the bridge pattern to abstract the payment
 * processor from the payment object and we can easily swap out the payment processor without changing the payment object.
 */

// example payment processor
interface PaymentProcessor {
	processPayment(amount: number): void
	refundPayment(amount: number): void
}

// Concrete implementors
class MastercardProcessor implements PaymentProcessor {
	processPayment(amount: number): void {
		console.log(`Processing ${amount} via Mastercard`)
	}
	refundPayment(amount: number): void {
		console.log(`Refunding ${amount} via Mastercard`)
	}
}

class VisaProcessor implements PaymentProcessor {
	processPayment(amount: number): void {
		console.log(`Processing ${amount} via Visa`)
	}
	refundPayment(amount: number): void {
		console.log(`Refunding ${amount} via Visa`)
	}
}

class PayPalProcessor implements PaymentProcessor {
	processPayment(amount: number): void {
		console.log(`Processing ${amount} via PayPal`)
	}
	refundPayment(amount: number): void {
		console.log(`Refunding ${amount} via PayPal`)
	}
}

// Abstraction
abstract class Payment {
	protected processor: PaymentProcessor
	protected exchangeRate: number

	constructor(processor: PaymentProcessor, exchangeRate: number) {
		this.processor = processor
		this.exchangeRate = exchangeRate
	}

	abstract makePayment(amount: number): void
	abstract makeRefund(amount: number): void
}

class CanadianPayment extends Payment {
	constructor(processor: PaymentProcessor, exchangeRate: number) {
		super(processor, exchangeRate)
	}

	makePayment(amount: number): void {
		this.processor.processPayment(amount * this.exchangeRate)
	}

	makeRefund(amount: number): void {
		this.processor.refundPayment(amount * this.exchangeRate)
	}
}

// usage example
const canadianPayment = new CanadianPayment(new MastercardProcessor(), 1.25)
canadianPayment.makePayment(100)
canadianPayment.makeRefund(100)
