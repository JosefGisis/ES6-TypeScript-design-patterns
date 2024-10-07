import { UpperCaseChar } from '../types'
import { BooleanConstantExpression, BooleanExpression, VariableExpression } from './interpreter'

export class VariableExpressionFlyweight {
	private static instance: VariableExpressionFlyweight

	public static getInstance(): VariableExpressionFlyweight {
		if (!VariableExpressionFlyweight.instance) {
			VariableExpressionFlyweight.instance = new VariableExpressionFlyweight()
		}
		return VariableExpressionFlyweight.instance
	}

	private expressions: Map<UpperCaseChar, VariableExpression> = new Map()

	public getExpression(char: UpperCaseChar): BooleanExpression {
		if (!this.expressions.has(char)) {
			this.expressions.set(char, new VariableExpression(char))
		}
		return this.expressions.get(char) as VariableExpression
	}
}

export class BooleanConstantExpressionFlyweight {
	private static instance: BooleanConstantExpressionFlyweight
	private TrueBooleanExpression: BooleanConstantExpression
	private FalseBooleanExpression: BooleanConstantExpression

	public static getInstance(): BooleanConstantExpressionFlyweight {
		if (!BooleanConstantExpressionFlyweight.instance) {
			BooleanConstantExpressionFlyweight.instance = new BooleanConstantExpressionFlyweight()
		}
		return BooleanConstantExpressionFlyweight.instance
	}

	private constructor() {
		this.TrueBooleanExpression = new BooleanConstantExpression(true)
		this.FalseBooleanExpression = new BooleanConstantExpression(false)
	}

	public getExpression(value: boolean): BooleanExpression {
		return value ? this.TrueBooleanExpression : this.FalseBooleanExpression
	}
}
