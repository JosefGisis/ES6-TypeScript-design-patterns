/**
 * The prototype pattern is a creational design pattern in software development. 
 * It is used when the type of objects to create is determined by a prototypical instance, which is cloned to produce new objects.
 * This pattern is particularly useful when the kind of objects to be created is open-ended.
 */

class Printer {
    text: any
    
    constructor() {
        this.text = undefined
    }

    setText(text: any) {
        this.text = text.clone()
    }

    print() {
        console.log(this.text.message)
    }
}

class HelloWorldText {
    message: string

    constructor() {
        this.message = 'Hello, World!'
    }

    clone() {
        return new HelloWorldText()
    }
}

// Usage
const printer = new Printer()
printer.setText(new HelloWorldText())
printer.print() // Output: Hello, World!