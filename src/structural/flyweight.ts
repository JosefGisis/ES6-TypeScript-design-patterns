/** The the flyweight design pattern uses sharing to allow a large number of objects
 * to be created and used efficiently.
 *
 * Sharing objects may add more processing overhead than creating new objects; however,
 * it allows a large number of objects to be created without being very costly on memory.
 *
 * Flyweight usually uses composite for recursive composition, and a factory method to
 * manage the creation of flyweight objects.
 *
 * This example is based on the text editor example from the book "Design Patterns".
 * It is a good exmaple of how flyweight can be used to create a large number of objects
 * without using a lot of memory. Each letter and layout object is a flyweight object.
 * The layout objects (row and column) may not need to take up a lot of memory, but the
 * characters can quickly add up and become a large memory drain.
 */

abstract class Glyph {
	abstract draw(): string
}

class Character extends Glyph {
	private char: string

	constructor(char: string) {
		super()
		this.char = char
	}

	draw(): string {
		return this.char
	}
}

class Space extends Glyph {
	draw(): string {
		return ' '
	}
}

class Factory {
	private characters: Map<string, Glyph> = new Map()

	getCharacter(char: string): Glyph {
		if (!this.characters.has(char)) {
			const character = char === '/s' ? new Space() : new Character(char)
			this.characters.set(char, character)
		}
		return this.characters.get(char) as Glyph
	}
}

const text = ['H', 'e', 'l', 'l', 'o', '/s', 'W', 'o', 'r', 'l', 'd', '/s', 'T', 'e', 's', 't']
let string: string = ''

const factory = new Factory()

for (const char of text) {
	const letter = factory.getCharacter(char)
	string += letter.draw()
}

console.log(string)

export {}
