// 给你一个字符串数组 tokens ，表示一个根据 逆波兰表示法 表示的算术表达式。

// 请你计算该表达式。返回一个表示表达式值的整数。

// 注意：

// 有效的算符为 '+'、'-'、'*' 和 '/' 。
// 每个操作数（运算对象）都可以是一个整数或者另一个表达式。
// 两个整数之间的除法总是 向零截断 。
// 表达式中不含除零运算。
// 输入是一个根据逆波兰表示法表示的算术表达式。
// 答案及所有中间计算结果可以用 32 位 整数表示。

// 示例 1：

// 输入：tokens = ["2","1","+","3","*"]
// 输出：9
// 解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9

// 方法一：栈

// 逆波兰表达式严格遵循「从左到右」的运算。计算逆波兰表达式的值时，使用一个栈存储操作数，从左到右遍历逆波兰表达式，进行如下操作：

// 如果遇到操作数，则将操作数入栈；

// 如果遇到运算符，则将两个操作数出栈，其中先出栈的是右操作数，后出栈的是左操作数，使用运算符对两个操作数进行运算，将运算得到的新操作数入栈。

// 整个逆波兰表达式遍历完毕之后，栈内只有一个元素，该元素即为逆波兰表达式的值。

var evalRPN = function (tokens) {
	const stack = []
	const n = tokens.length
	for (let i = 0; i < n; i++) {
		const token = tokens[i]
		if (isNumber(token)) {
			stack.push(parseInt(token))
		} else {
			const num2 = stack.pop()
			const num1 = stack.pop()
			if (token === '+') {
				stack.push(num1 + num2)
			} else if (token === '-') {
				stack.push(num1 - num2)
			} else if (token === '*') {
				stack.push(num1 * num2)
			} else if (token === '/') {
				stack.push(num1 / num2 > 0 ? Math.floor(num1 / num2) : Math.ceil(num1 / num2))
			}
		}
	}
	return stack.pop()
}

const isNumber = (token) => {
	return !('+' === token || '-' === token || '*' === token || '/' === token)
}
