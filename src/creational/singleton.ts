/**
 * The singleton pattern is a creational pattern that ensures that only one instance of a class is created.
 * This is useful when exactly one object is needed to coordinate actions across the system.
 */

class HiveMind {
	private static instance: HiveMind

	private constructor() {}

	public static getInstance(): HiveMind {
		if (!HiveMind.instance) {
            console.log('I am the HiveMind. Here to rule you!')
			HiveMind.instance = new HiveMind()
		} else {
			console.log('Did you really think you could replace the HiveMind?!')
		}
		return HiveMind.instance
	}
}

// Usage
const instance1 = HiveMind.getInstance()
const instance2 = HiveMind.getInstance()

// JavaScript offers a far simpler way to create singletons using the object literal notation.
// This is because object literals are singletons by nature.
const singleton = {
    prop1: 'prop1',
    prop2: 'prop2'
}
