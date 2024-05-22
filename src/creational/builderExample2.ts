/**
 * The builder pattern is often used slightly differently than the kind found in the book 
 * "Design Patterns: Elements of Reusable Object-Oriented Software". In this example, the
 * builder pattern is used to construct a complex object by adding parts to it peacemeal.
 */

class Burger {
    burger: string[]

    constructor() {
        this.burger = ['You have a burger with: ']
    }

    addPatty(): void {
        this.burger.push('patty')
    }

    addCheese(): void {
        this.burger.push('cheese')
    }

    addLettuce(): void {
        this.burger.push('lettuce')
    }
  
    addTomato(): void {
        this.burger.push('tomato')
    }

    addOnion(): void {
        this.burger.push('onion')
    }

    addEtc(): void {
        this.burger.push('etc')
    }
}

// usage
const myBurger = new Burger()
myBurger.addPatty()
myBurger.addCheese()
myBurger.addLettuce()
myBurger.addTomato()
myBurger.addOnion()
myBurger.addEtc()
console.log(myBurger)
