/**
 * The facade design pattern provides a unified interface to a set of interfaces in a subsystem.
 * Clients can use the facade class to access the subsystem with ease, which reduces the number of
 * objects that the client needs to deal with because the facade class does all the work to access
 * the subsystem.
 *
 * Clients can still use the subsystem directly if they need to.
 */

// Baker manager is a facade for the subsystems at work in a bakery.
// In this example clients need not be aware of inventory management, or the details of baking a cake and selling a cake.
class BakeryManager {
	public baker: Baker
	public cashier: Cashier

	constructor() {
		this.baker = new Baker()
		this.cashier = new Cashier()
	}

	bakeCake() {
		this.baker.bakeCake()
	}
	sellCake() {
		this.cashier.sellCake(this.baker.cake ?? null)
		this.baker.cake = null
	}
	checkRegister() {
		console.log('made ' + this.cashier.money + ' dollars today')
	}
}

class InventoryManager {
	public flour: number
	public sugar: number
	public eggs: number

	constructor() {
		this.flour = 0
		this.sugar = 0
		this.eggs = 0
	}

	stockUp() {
		this.flour += 100
		this.sugar += 100
		this.eggs += 100
	}

	useIngredients() {
		if (this.flour < 10 || this.sugar < 10 || this.eggs < 10) {
			console.log('Not enough ingredients. Stock up first.')
			this.stockUp()
		}
		this.flour -= 10
		this.sugar -= 10
		this.eggs -= 10
	}
}

class Baker {
	public cake: { flour: number; sugar: number; eggs: number } | null

	constructor() {
		this.cake = null
	}

	bakeCake() {
		const inventoryManager = new InventoryManager()
		inventoryManager.stockUp()
		inventoryManager.useIngredients()
		this.cake = {
			flour: 10,
			sugar: 10,
			eggs: 10,
		}
		return this.cake
	}
}

class Cashier {
	money: number

	constructor() {
		this.money = 0
	}

	sellCake(cake: { flour: number; sugar: number; eggs: number } | null) {
		if (!cake) {
			console.log('No cake to sell. Bake a cake first.')
			return
		}
		console.log('Sold cake:')
		console.log(cake)
		this.money += 10
	}
}

// Usage
const JosefsBakery = new BakeryManager()
JosefsBakery.bakeCake()
JosefsBakery.sellCake()
JosefsBakery.bakeCake()
JosefsBakery.sellCake()
JosefsBakery.checkRegister()

export {}
