/**
 * The builder design pattern seperates the construction of a complex object from its representation.
 * This allows greater flexibility and control over the construction process and allows quick changes to the
 * object being built.
 *
 * Below is an example of an object director that uses an object builder to create objects.
 * The object director is responsible for the construction of the object and the object builder is responsible
 * for the representation of the object. Notice how the flexibility of the builder pattern allows for the construction 
 * of the survey object to be easily changed by changing the object builder.
 * SurveyJS is an automated form generator that uses a complex object to construct forms.
 */


// ObjectDirector also uses the singleton pattern to ensure that only one instance of the object director is created. See src/creational/singleton.ts
export class ObjectDirector {
	private static instance: ObjectDirector

	private objectBuilder: any

	private constructor() {
		this.objectBuilder = new SurveyObjectBuilder()
	}

	public static getInstance(): ObjectDirector {
		if (!ObjectDirector.instance) {
			ObjectDirector.instance = new ObjectDirector()
		}
		return ObjectDirector.instance
	}

    // getObject should really be part of the builders interface (e.g. this.objectBuilder.getObject())
	getObject(): any {
		return this.objectBuilder.object
	}

	addKeyValue(key: string, value: string): void {
		this.objectBuilder.addKeyValue(key, value)
	}

    emptyObject(): void {
        this.objectBuilder.emptyObject()
    }
}

export abstract class ObjectBuilder {
    abstract object: any
    constructor() {}
	abstract addKeyValue(key: string, value: string): void
    abstract emptyObject(): void
}

// This is a basic example of a survey object that could be used to generate a form.
export interface SurveyObjectType {
    name: string
    elements: {
        name: string
        type: 'text'
        label: string
        required: boolean
    }[]
}

export class SurveyObjectBuilder extends ObjectBuilder {
    override object: SurveyObjectType

    constructor () {
        super()
        this.object = {
            name: 'Survey',
            elements: [],
        }
    }

    // builders flexibility allows for easy changes to the object being built
    // In this example we are ignoring the key value and just adding the value to the object
	addKeyValue(_: string, value: string) {
        const emptyObject: any = {}
        emptyObject.name = value 
        emptyObject.type = 'text'
        emptyObject.label = value
        emptyObject.required = true
		this.object.elements.push(emptyObject)
	}

    // a survey empty object is just a survey object with no elements
    emptyObject(): void {
        this.object = {
            name: 'Survey',
            elements: [],
        }
    }
}

// Usage
const myObjectDirector = ObjectDirector.getInstance()
myObjectDirector.addKeyValue('_', 'name')
myObjectDirector.addKeyValue('_', 'age')
myObjectDirector.addKeyValue('_', 'email')
console.log(myObjectDirector.getObject())
myObjectDirector.emptyObject()
console.log(myObjectDirector.getObject())