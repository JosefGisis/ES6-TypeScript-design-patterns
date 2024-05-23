/**
 * Factory Method is a creational design pattern that provides an interface for creating objects in a superclass
 * , but allows subclasses to alter the type of objects that will be created. This is important when the particular
 * object that will be created is not known. The abstract factory delegate the responsibility of creating objects to
 * its subclasses.
 *
 * An example would be a shoe factory. The abstract class knows that it requires leather, lace, glue and rubber to
 * make the shoe. However, the type of leather, lace, glue and rubber is not known. The subclasses of the factory
 * will provide the type of leather, lace, glue and rubber to be used, as well as the style of shoe.
 */

interface Shoe {
	material: 'leather' | 'canvas' | 'suede'
	lace: 'lace'
	glue: 'glue'
	rubber: 'rubber'
}

interface Oxford extends Shoe {
	material: 'leather'
	style: 'oxford'
}

interface Sneaker extends Shoe {
	material: 'canvas'
	style: 'sneaker'
}

interface Boot extends Shoe {
	material: 'suede'
	style: 'boot'
}

abstract class ShoeFactory {
	shoe: Shoe
	constructor() {
		this.shoe = this.createShoe()
	}
	public abstract createShoe(): Shoe
}

// This is the first method of creating the specific shoe factories. Each type of shoe has its own subclass.

class OxfordShoeFactory extends ShoeFactory {
	override shoe: Oxford

	constructor() {
		super()
		this.shoe = this.createShoe()
	}

	public override createShoe(): Oxford {
		return { material: 'leather', lace: 'lace', glue: 'glue', rubber: 'rubber', style: 'oxford' }
	}
}

class SneakerShoeFactory extends ShoeFactory {
	override shoe: Sneaker

	constructor() {
		super()
		this.shoe = this.createShoe()
	}

	public override createShoe(): Sneaker {
		return { material: 'canvas', lace: 'lace', glue: 'glue', rubber: 'rubber', style: 'sneaker' }
	}
}

class BootShoeFactory extends ShoeFactory {
	override shoe: Boot

	constructor() {
		super()
		this.shoe = this.createShoe()
	}

	public override createShoe(): Boot {
		return { material: 'suede', lace: 'lace', glue: 'glue', rubber: 'rubber', style: 'boot' }
	}
}

// This is the second method of creating the specific shoe factories. The constructor of the factory will take in a
// parameter that will determine the type of shoe to be created.
class ConcreteShoeFactory extends ShoeFactory {
	override shoe: Oxford | Sneaker | Boot
    style: 'oxford' | 'sneaker' | 'boot'

	public constructor(style: 'oxford' | 'sneaker' | 'boot') {
		super()
		this.style = style
		this.shoe = this.createShoe()
	}

	public override createShoe(): Oxford | Sneaker | Boot {
		if (this.style === 'oxford') {
			return { material: 'leather', lace: 'lace', glue: 'glue', rubber: 'rubber', style: 'oxford' }
		}
		if (this.style === 'sneaker') {
			return { material: 'canvas', lace: 'lace', glue: 'glue', rubber: 'rubber', style: 'sneaker' }
		}
		return { material: 'suede', lace: 'lace', glue: 'glue', rubber: 'rubber', style: 'boot' }
	}
}

// Usage
const oxfordShoeFactory = new OxfordShoeFactory()
console.log(oxfordShoeFactory.shoe)

const sneakerShoeFactory = new ConcreteShoeFactory('sneaker')
console.log(sneakerShoeFactory.shoe)