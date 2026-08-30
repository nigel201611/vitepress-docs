// 58 火星人计算器: # 优先级高于 $, 相同运算符从左到右
// x#y = 4*x+3*y+2; x$y = 2*x+y+3
// 输入: 火星人字符串表达式, 如 "7#6$5#12"

function main(expr) {
  const nums = expr.split(/[#$]/).map(Number)
  const ops = expr.match(/[#$]/g) || []
  const stack = [nums[0]]
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === '#') {
      const a = stack.pop()
      const b = nums[i + 1]
      stack.push(4 * a + 3 * b + 2)
    } else {
      stack.push(nums[i + 1])
    }
  }
  let res = stack[0]
  for (let i = 1; i < stack.length; i++) {
    res = 2 * res + stack[i] + 3
  }
  return res
}

console.log(main('7#6$5#12'))
