/**
 * See src/behavioral/interpreter.ts for an explanation of the interpreter design pattern.
 */

import Context from '../context/context'
import { UpperCaseChar } from '../types'
import { BooleanConstantExpressionFlyweight, VariableExpressionFlyweight } from './flyweights'

const variableExpressionFlyweight = VariableExpressionFlyweight.getInstance()
const booleanConstantExpressionFlyweight = BooleanConstantExpressionFlyweight.getInstance()

export abstract class BooleanExpression {
	abstract evaluate(context: Context): boolean
	abstract replace(char: string, expression: BooleanExpression): BooleanExpression
	abstract copy(): BooleanExpression
}

export abstract class AndAndOrExpression extends BooleanExpression {
	protected operand1: BooleanExpression
	protected operand2: BooleanExpression

	public constructor(operand1: BooleanExpression, operand2: BooleanExpression) {
		super()
		this.operand1 = operand1
		this.operand2 = operand2
	}
}

export class AndExpression extends AndAndOrExpression {
	evaluate(context: Context): boolean {
		return this.operand1.evaluate(context) && this.operand2.evaluate(context)
	}

	replace(char: UpperCaseChar, expression: BooleanExpression): BooleanExpression {
		return new AndExpression(this.operand1.replace(char, expression), this.operand2.replace(char, expression))
	}

	copy(): BooleanExpression {
		return new AndExpression(this.operand1.copy(), this.operand2.copy())
	}
}

export class OrExpression extends AndAndOrExpression {
	evaluate(context: Context): boolean {
		return this.operand1.evaluate(context) || this.operand2.evaluate(context)
	}

	replace(char: UpperCaseChar, expression: BooleanExpression): BooleanExpression {
		return new OrExpression(this.operand1.replace(char, expression), this.operand2.replace(char, expression))
	}

	copy(): BooleanExpression {
		return new OrExpression(this.operand1.copy(), this.operand2.copy())
	}
}

export class NotExpression extends BooleanExpression {
	private expression: BooleanExpression

	constructor(expression: BooleanExpression) {
		super()
		this.expression = expression
	}

	evaluate(context: Context): boolean {
		return !this.expression.evaluate(context)
	}

	replace(char: string, expression: BooleanExpression): BooleanExpression {
		return new NotExpression(this.expression.replace(char, expression))
	}

	copy(): BooleanExpression {
		return new NotExpression(this.expression.copy())
	}
}

export class VariableExpression extends BooleanExpression {
	private char: UpperCaseChar

	constructor(char: UpperCaseChar) {
		super()
		this.char = char
	}

	evaluate(context: Context): boolean {
		return context.lookup(this.char)
	}

	replace(char: UpperCaseChar, expression: BooleanExpression): BooleanExpression {
		if (char === this.char) {
			return expression.copy()
		}
		return variableExpressionFlyweight.getExpression(this.char)
	}

	copy(): BooleanExpression {
		return variableExpressionFlyweight.getExpression(this.char)
	}
}

export class BooleanConstantExpression extends BooleanExpression {
	private value: boolean

	constructor(value: boolean) {
		super()
		this.value = value
	}

	evaluate(): boolean {
		return this.value
	}

	replace(char: UpperCaseChar, expression: BooleanExpression): BooleanExpression {
		return this.copy()
	}

	copy(): BooleanExpression {
		return booleanConstantExpressionFlyweight.getExpression(this.value)
	}
}
