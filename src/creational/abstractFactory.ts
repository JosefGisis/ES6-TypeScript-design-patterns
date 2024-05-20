// The abstract factory pattern provides an interface for creating related or dependant objects
// without specifying their concrete classes. This allows the client to be separated from the
// specifics of the object conformities and dependencies.

// Example using es6 features.

// In this example we have a clothing factory that can create red or blue clothing.
// It is important that all clothing products need to be the same color. Rather than managing that
// in the client code, we can use an abstract factory to ensure that all products are the same color.

type Shoes = 'red shoes' | 'blue shoes'
type Shirt = 'red shirt' | 'blue shirt'
type Pants = 'red pants' | 'blue pants'

// Abstract factory and concrete factories.
abstract class AbstractClothingFactory {
	abstract createShoes(): Shoes

	abstract createShirt(): Shirt

	abstract createPants(): Pants
}

class ConcreteRedClothingFactory extends AbstractClothingFactory {
	createShoes(): Shoes {
		return new RedShoes().createRedProduct()
	}

	createShirt(): Shirt {
		return new RedShirt().createRedProduct()
	}

	createPants(): Pants {
		return new RedPants().createRedProduct()
	}
}

class ConcreteBlueClothingFactory extends AbstractClothingFactory {
	createShoes(): Shoes {
		return new BlueShoes().createBlueProduct()
	}

	createShirt(): Shirt {
		return new BlueShirt().createBlueProduct()
	}

	createPants(): Pants {
		return new BluePants().createBlueProduct()
	}
}

// Abstract products and concrete products.
abstract class AbstractRedClothingProduct {
	abstract createRedProduct(): string
}

class RedShoes extends AbstractRedClothingProduct {
	override createRedProduct(): 'red shoes' {
		return 'red shoes'
	}
}

class RedShirt extends AbstractRedClothingProduct {
	override createRedProduct(): 'red shirt' {
		return 'red shirt'
	}
}

class RedPants extends AbstractRedClothingProduct {
	override createRedProduct(): 'red pants' {
		return 'red pants'
	}
}

abstract class AbstractBlueClothingProduct {
	abstract createBlueProduct(): string
}

class BlueShoes extends AbstractBlueClothingProduct {
	override createBlueProduct(): 'blue shoes' {
		return 'blue shoes'
	}
}

class BlueShirt extends AbstractBlueClothingProduct {
	override createBlueProduct(): 'blue shirt' {
		return 'blue shirt'
	}
}

class BluePants extends AbstractBlueClothingProduct {
	override createBlueProduct(): 'blue pants' {
		return 'blue pants'
	}
}

// Usage
const factory = new ConcreteRedClothingFactory()
const shoes = factory.createShoes()
console.log(shoes)
