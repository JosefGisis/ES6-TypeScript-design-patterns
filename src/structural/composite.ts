/**
 * The Composite design pattern composes objects into part-whole hierarchies, with the purpose of
 * allowing client to uniformly interact with composite and individual objects.
 *
 * This structure also supports recursive composition, which allows an object to be a part of multiple
 * objects at the same time.
 */

// This example will use strings as the leaf objects and arrays as the composite objects.
// Component interface
abstract class Component {
	abstract logText(): void
	abstract add(component: Component): void
	abstract remove(component: Component): void
	abstract getChild(index: number): Component | null
	abstract getChildren(): Component[]
}

// Leaf class
class Sentence extends Component {
	private text: string

	constructor(text: string) {
		super()
		this.text = text
	}

	logText(): void {
		console.log(this.text)
	}

	add(): void {
		console.log('Cannot add to a sentence')
	}

	remove(): void {
		console.log('Cannot remove from a sentence')
	}

	getChild(): null {
		console.log('Cannot get child from a sentence')
		return null
	}

	override getChildren(): Component[] {
		console.log('Sentences will always return an empty array as they cannot have children')
		return []
	}
}

// Composite class
class Paragraph extends Component {
    private children: Component[] = []

    logText(): void {
        this.children.forEach((child) => child.logText())
    }

    add(component: Component): void {
        this.children.push(component)
    }

    remove(component: Component): void {
        this.children = this.children.filter((child) => child !== component)
    }

    getChild(index: number): Component | null {
        if (index < 0 || index >= this.children.length) {
            return null
        }
        return this.children[index]
    }

    getChildren(): Component[] {
        return this.children
    }
}

// Client
const paragraph = new Paragraph()
paragraph.add(new Sentence('Hello, world!'))
paragraph.add(new Sentence('This is a paragraph.'))
paragraph.add(new Sentence('It has multiple sentences.'));

// I can recursively add composites to composites until I run out of life.
const superParagraph = new Paragraph()
superParagraph.add(paragraph)
superParagraph.add(new Sentence('This is a sentence in the super paragraph.'))
superParagraph.logText()


