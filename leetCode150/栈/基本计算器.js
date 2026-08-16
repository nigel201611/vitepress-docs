// 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
// 表达式只包含 '('、')'、'+'、'-'、非负整数和空格 ' '。整数除法向零截断？不——本题只有加减法。
// 注意：加减号只作为二元运算符，不会出现在数字前面（即不会出现类似 "-1+2" 的表达式）。

// 思路：栈处理括号 + 逐项累加
// 维护 result（当前括号层级内已计算的累积值）、sign（当前符号）、num（正在解析的数字）。
// 遇到 '('：把当前 result 和 sign 压栈，result 和 sign 重置（进入新的括号层级）
// 遇到 ')'：先结算当前数字，再取出栈顶的 sign 和 result 恢复外层上下文
// 核心：括号展开 —— (a - (b - c)) 等价于 a - b + c，符号按括号层级翻转。

var calculate = function (s) {
  const stack = []
  let sign = 1
  let num = 0
  let result = 0

  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + (ch - '0')
    } else if (ch === '+') {
      result += sign * num
      num = 0
      sign = 1
    } else if (ch === '-') {
      result += sign * num
      num = 0
      sign = -1
    } else if (ch === '(') {
      stack.push(result)
      stack.push(sign)
      result = 0
      sign = 1
    } else if (ch === ')') {
      result += sign * num
      num = 0
      result *= stack.pop() // 弹出括号前的符号，应用到括号内的结果
      result += stack.pop() // 弹回括号前的累积值
    }
  }
  return result + sign * num
}

console.log(calculate('1 + 1')) // 2
console.log(calculate(' 2-1 + 2 ')) // 3
console.log(calculate('(1+(4+5+2)-3)+(6+8)')) // 23
