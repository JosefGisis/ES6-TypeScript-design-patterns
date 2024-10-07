import { isValidExpressionType } from '../types'

class Compiler {
	// private compiledExpression: string[] = []

	compile(expression: string) {
		const stringArray = this.compileToStringArray(expression)
		this.parseStringArray(stringArray)
		console.log(stringArray)
	}

	compileToStringArray(expression: string): string[] {
		return expression.split(' ')
	}

	parseStringArray(expressionArray: string[]): any {
		expressionArray.forEach((word, index) => {
			if (!isValidExpressionType(word)) {
				throw new Error(
					'Invalid expression type. Expression can only contain "true", "false", "and", "or", "not", or a an upper-case character.'
				)
			} else return
		})
	}
}

const compiler = new Compiler()
compiler.compile('A and B')

/**
 * split by spaces =>
 * go through each word =>
 *     if word is a character, create a character object
 *     else if the word is a boolean, create a boolean object
 *     else if the word is an operator, create an operator object containing the previous object and the next object
 *     else if the word is not, create a not object containing the next object
 *     else if the word is surrounded by parentheses. start compiling again and get a space in the array.
 *     else throw an error.
 */
