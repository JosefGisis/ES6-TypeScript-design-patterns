/**
 * A template method defines the steps of an algorithm but defers the implementation of some steps to subclasses.
 * The steps of the algorithm are methods that can be defined in the base class or overridden in the subclass. One of
 * the methods can be a hook, which is a method that does nothing by default but can be overridden by the subclass. Either way,
 * all the methods are called in the same order by the template method.
 * This pattern is useful when you have an algorithm that has a fixed set of steps but the implementation of those steps can vary.
 *
 * The template method is related the builder patterns in that the builder pattern often uses a template method to define the building process.
 */

abstract class BakeBread {
	bakeBread(): void {
		console.log('\n')
		// mixIngredients is abstract, so it must be implemented by the subclass
		this.mixIngredients()
		this.kneadDough()
		// letDougnRise is a hook, does not nothing by default but can be overridden by the subclass
		this.letDoughRise()
		this.bakeDough()
	}

	abstract mixIngredients(): void

	kneadDough(): void {
		console.log('Kneading dough...')
	}

	letDoughRise(): void {
		return
	}

	bakeDough(): void {
		console.log('Baking dough...')
	}
}

class BakeWhiteBread extends BakeBread {
	mixIngredients(): void {
		console.log('Mixing water, flour, yeast, and salt...')
	}

	override letDoughRise(): void {
		console.log('Letting dough rise for 1 hour...')
	}
}

class BakeWholeWheatBread extends BakeBread {
	mixIngredients(): void {
		console.log('Mixing water, whole wheat flour, yeast, and salt...')
	}

	override letDoughRise(): void {
		console.log('Letting dough rise for 2 hours...')
	}
}

// Usage (client)
const whiteBread = new BakeWhiteBread()
whiteBread.bakeBread()

const wholeWheatBread = new BakeWholeWheatBread()
wholeWheatBread.bakeBread()
