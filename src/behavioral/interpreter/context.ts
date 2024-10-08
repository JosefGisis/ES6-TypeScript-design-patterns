import { isUpperCaseCharType, UpperCaseChar } from './types.js'

export const upperCaseABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

interface ContextInterface {
	lookup(char: UpperCaseChar): boolean
	assign(char: UpperCaseChar, value: boolean): void
}

// Context is a singleton.
export default class Context implements ContextInterface {
	public static instance: Context | null = null
	private charMap = new Map<UpperCaseChar, boolean>()

	public static getInstance(): Context {
		if (!Context.instance) {
			Context.instance = new Context()
		}
		return Context.instance
	}

	private constructor() {
		const charMap = new Map<UpperCaseChar, boolean>()
		for (const char of upperCaseABC) {
			if (!isUpperCaseCharType(char)) {
				throw new Error('List of characters does not conform to UpperCaseChars type. Please check the list of characters.')
			}
			charMap.set(char, false)
		}
		this.charMap = charMap
	}

	public lookup(char: UpperCaseChar): boolean {
		let result = this.charMap.get(char)
		if (result === undefined) result = false
		return result
	}

	public assign(char: UpperCaseChar, value: boolean): void {
		this.charMap.set(char, value)
	}
}
