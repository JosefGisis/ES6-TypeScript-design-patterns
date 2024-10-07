export type BooleanExpressionType = AndExpressionType | OrExpressionType | NotExpressionType | BooleanLiteralType
export type AndExpressionType = 'and'
export type OrExpressionType = 'or'
export type NotExpressionType = 'not'
export type BooleanLiteralType = 'true' | 'false'
export type VariableExpressionType = UpperCaseChar
export type UpperCaseChar =
	| 'A'
	| 'B'
	| 'C'
	| 'D'
	| 'E'
	| 'F'
	| 'G'
	| 'H'
	| 'I'
	| 'J'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'O'
	| 'P'
	| 'Q'
	| 'R'
	| 'S'
	| 'T'
	| 'U'
	| 'V'
	| 'W'
	| 'X'
	| 'Y'
	| 'Z'

export function isUpperCaseCharType(char: string): char is UpperCaseChar {
	return /[A-Z]/.test(char)
}

export function isValidExpressionType(expression: string): expression is BooleanExpressionType {
	return ['and', 'or', 'not', 'true', 'false'].includes(expression) || isUpperCaseCharType(expression)
}
