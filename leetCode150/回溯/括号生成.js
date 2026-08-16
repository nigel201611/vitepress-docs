// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

// 思路：回溯
// 递归过程中维护两个计数：
//   已放左括号数 left、已放右括号数 right
// 有效性的两个约束：
//   1. left < n 时才能放左括号
//   2. right < left 时才能放右括号（右括号不能超过左括号）
// 当左右都放满 n 个时收集结果。

var generateParenthesis = function (n) {
  const res = []

  const dfs = (left, right, path) => {
    if (left === n && right === n) {
      res.push(path)
      return
    }
    if (left < n) {
      dfs(left + 1, right, path + '(')
    }
    if (right < left) {
      dfs(left, right + 1, path + ')')
    }
  }

  dfs(0, 0, '')
  return res
}

console.log(generateParenthesis(3)) // ["((()))","(()())","(())()","()(())","()()()"]
console.log(generateParenthesis(1)) // ["()"]
